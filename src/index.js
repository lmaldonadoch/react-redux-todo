import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import Footer from './components/Footer';

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed,
      };

    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todo(undefined, action)];
    case 'TOGGLE_TODO':
      return state.map((t) => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const todoApp = combineReducers({
  todos,
  visibilityFilter,
});

const store = createStore(todoApp);

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter((todo) => {
        return todo.completed;
      });
    case 'SHOW_ACTIVE':
      return todos.filter((todo) => {
        return !todo.completed;
      });
    default:
      return todos;
  }
};

let nextTodoId = 0;

class TodoApp extends React.Component {
  render() {
    const visibleTodos = getVisibleTodos(
      this.props.todos,
      this.props.visibilityFilter
    );
    return (
      <div className="App">
        <AddTodo
          onAddClick={(text) =>
            store.dispatch({
              type: 'ADD_TODO',
              id: (nextTodoId += 1),
              text,
            })
          }
        />
        <TodoList
          todos={visibleTodos}
          onTodoClick={(id) =>
            store.dispatch({
              type: 'TOGGLE_TODO',
              id,
            })
          }
        />
        <Footer
          onFilterClick={(filter) => {
            store.dispatch({
              type: 'SET_VISIBILITY_FILTER',
              filter,
            });
          }}
        />
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(
    <React.StrictMode>
      <TodoApp {...store.getState()} />
    </React.StrictMode>,
    document.getElementById('root')
  );
};

store.subscribe(render);
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

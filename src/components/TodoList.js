import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, onTodoClick }) => {
  return (
    <ul>
      {todos.map((todo) => {
        return (
          <Todo ky={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
        );
      })}
    </ul>
  );
};

export default TodoList;

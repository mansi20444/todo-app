// src/TodoList.js
import React, { useState, useEffect } from 'react';
import Task from './task';
import './App.css';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './Api';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fetch todos from the API when the component mounts
  useEffect(() => {
    fetchTodos().then((data) => setTodos(data));
  }, []);

  const handleCreateTodo = () => {
    createTodo({ task: newTask, done: false }).then((data) => {
      setTodos([...todos, data]);
      setNewTask('');
    });
  };

  const handleUpdateTodo = (id, done) => {
    updateTodo(id, { done }).then(() => {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, done } : todo
      );
      setTodos(updatedTodos);
    });
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="task-container">
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Add a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleCreateTodo}>Add Task</button>
      <ul>
        {todos.map((todo) => (
          <Task
            key={todo.id}
            task={todo.task}
            done={todo.done}
            onToggle={() => handleUpdateTodo(todo.id, !todo.done)}
            onDelete={() => handleDeleteTodo(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

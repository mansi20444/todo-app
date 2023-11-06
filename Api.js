// src/Api.js

const apiUrl = 'https://api.staging.sumize.io/api/todos';

export const fetchTodos = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createTodo = async (todo) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Failed to create a new todo');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateTodo = async (id, todo) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Failed to update the todo');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete the todo');
    }
  } catch (error) {
    console.error(error);
  }
};

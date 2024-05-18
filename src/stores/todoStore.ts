// src/stores/todoStore.ts
import { defineStore } from 'pinia';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface State {
  todos: TodoItem[];
  filter: string;
}

export const useTodoStore = defineStore('todo', {
  state: (): State => ({
    todos: [],
    filter: 'all'
  }),
  getters: {
    filteredTodos(state): TodoItem[] {
      switch (state.filter) {
        case 'active':
          return state.todos.filter(todo => !todo.completed);
        case 'completed':
          return state.todos.filter(todo => todo.completed);
        default:
          return state.todos;
      }
    }
  },
  actions: {
    async fetchTodos() {
      try {
        const response = await axios.get<TodoItem[]>(`${apiUrl}/todos`);
        this.todos = response.data; // 確保狀態更新方式正確
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    },
    async addTodo(text: string) {
      try {
        const newTodo = { id: '', completed: false, text };
        const response = await axios.post<TodoItem>(`${apiUrl}/todos`, newTodo);
        this.todos.push(response.data);
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    },
    async deleteTodo(id: string) {
      try {
        await axios.delete(`${apiUrl}/todos/${id}`);
        this.todos = this.todos.filter(todo => todo.id !== id);
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    },
    async updateTodo(id: string, text: string) {
      try {
        const response = await axios.put<TodoItem>(`${apiUrl}/todos`, { id, text });
        this.todos = this.todos.map(todo => (todo.id === id ? response.data : todo));
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    },
    async toggleTodo(id: string) {
      try {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
          todo.completed = !todo.completed;
          const response = await axios.put<TodoItem>(`${apiUrl}/todos`, todo);
          this.todos = this.todos.map(todo => (todo.id === id ? response.data : todo));
        }
      } catch (error) {
        console.error("Error toggling todo:", error);
      }
    },
    async toggleAllTodos(checked: boolean) {
      try {
        const newTodos = this.todos.map(todo => ({ ...todo, completed: checked }));
        const response = await axios.put<TodoItem[]>(`${apiUrl}/todos/batch`, newTodos);
        this.todos = response.data;
      } catch (error) {
        console.error("Error toggling all todos:", error);
      }
    },
    async clearCompletedTodos() {
      try {
        const completedIds = this.todos.filter(todo => todo.completed).map(todo => todo.id);
        await axios.post(`${apiUrl}/todos/delete/batch`, { ids: completedIds });
        this.todos = this.todos.filter(todo => !todo.completed);
      } catch (error) {
        console.error("Error clearing completed todos:", error);
      }
    }
  }
});

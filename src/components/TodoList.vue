<script setup lang="ts">
import { computed, ref } from "vue";
import { useTodoStore } from "../stores/todoStore";

const todoStore = useTodoStore();
const filteredTodos = computed(() => todoStore.filteredTodos);
const editingTodoId = ref<string | null>(null);
const isComposing = ref(false);

const removeTodoItem = (id: string) => {
  todoStore.deleteTodo(id);
};

const toggleTodoStatus = (id: string) => {
  todoStore.toggleTodo(id);
};

const startEditing = (id: string) => {
  editingTodoId.value = id;
};

const stopEditing = (id: string, newText: string) => {
  if (isComposing.value) return;
  todoStore.updateTodo(id, newText);
  editingTodoId.value = null;
};

const onBlur = () => {
  editingTodoId.value = null;
};

const handleCompositionStart = () => {
  isComposing.value = true;
};

const handleCompositionEnd = () => {
  setTimeout(() => {
    isComposing.value = false;
  });
};
</script>

<template>
  <ul class="todo-list">
    <li v-for="todo in filteredTodos" :key="todo.id" :class="{ completed: todo.completed, editing: editingTodoId === todo.id }">
      <div class="view" v-if="editingTodoId !== todo.id">
        <input class="toggle" type="checkbox" v-model="todo.completed" @click="toggleTodoStatus(todo.id)">
        <label @dblclick="startEditing(todo.id)">{{ todo.text }}</label>
        <button class="destroy" @click="removeTodoItem(todo.id)"></button>
      </div>
      <input 
        class="edit" 
        v-focus 
        v-if="editingTodoId === todo.id" 
        v-model="todo.text" 
        @blur="onBlur()" 
        @keydown.enter="stopEditing(todo.id, todo.text)" 
        @compositionstart="handleCompositionStart" 
        @compositionend="handleCompositionEnd"
      >
    </li>
  </ul>
</template>

<style scoped>
/* Add your styles here */
</style>

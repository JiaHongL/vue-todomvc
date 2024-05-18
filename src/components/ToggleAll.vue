<script setup lang="ts">
import { computed } from 'vue';
import { useTodoStore } from '../stores/todoStore';

const todoStore = useTodoStore();

const toggleAll = () => {
  const checked = allTodosCompleted.value;
  todoStore.toggleAllTodos(!checked);
};

const allTodosCompleted = computed(() => {
  return todoStore.todos.length > 0 && todoStore.todos.every(todo => todo.completed);
});
</script>

<template>
  <input
    id="toggle-all"
    class="toggle-all"
    type="checkbox"
    v-model="allTodosCompleted"
    @change="toggleAll"
  >
  <label for="toggle-all">Toggle All Input</label>
</template>

<style scoped></style>

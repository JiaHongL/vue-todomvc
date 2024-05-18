<script setup lang="ts">
  import { computed, ref } from 'vue'; 
  import { useTodoStore } from '../stores/todoStore';
  
  const todoStore = useTodoStore();

  const activeTodoCount = computed(() => todoStore.todos.filter(todo => !todo.completed).length);
  const completedTodoCount = computed(() => todoStore.todos.filter(todo => todo.completed).length);
  const clearAllCompleted = () => todoStore.clearCompletedTodos();

</script>

<template>
  <footer class="footer">
    <!-- This should be 0 items left by default -->
    <span class="todo-count"><strong>{{ activeTodoCount }}</strong> item left</span>
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li>
        <router-link to="/all" active-class="selected">All</router-link>
      </li>
      <li>
        <router-link to="/active" active-class="selected">Active</router-link>
      </li>
      <li>
        <router-link to="/completed" active-class="selected">Completed</router-link>
      </li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <template v-if="completedTodoCount > 0">
      <button class="clear-completed" @click="clearAllCompleted()">Clear completed</button>
    </template>
  </footer>
</template>

<style scoped></style>

<script setup lang="ts">
import { ref } from "vue";
import { useTodoStore } from "../stores/todoStore";

const todoStore = useTodoStore();
const newTodo = ref('');
const isComposing = ref(false);

const addNewTodo = () => {
  if (isComposing.value || newTodo.value.trim() === '') return;
    todoStore.addTodo(newTodo.value);
    newTodo.value = '';
};

const handleCompositionStart = (event:any) => {
  isComposing.value = true;
};

const handleCompositionEnd = () => {
  setTimeout(() => {
    isComposing.value = false;
  }, 200);
};
</script>

<template>
  <header class="header">
    <h1>todos</h1>
    <input 
      v-model="newTodo" 
      @keyup.enter="addNewTodo" 
      @compositionstart="handleCompositionStart" 
      @compositionend="handleCompositionEnd"
      class="new-todo" 
      placeholder="What needs to be done?" 
      autofocus 
    />
  </header>
</template>

<style scoped></style>

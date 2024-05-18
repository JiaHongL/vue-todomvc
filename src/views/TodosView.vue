<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useTodoStore } from '../stores/todoStore';
import { useRoute, useRouter } from 'vue-router';

import Header from './../components/Header.vue';
import Footer from './../components/Footer.vue';
import TodoList from './../components/TodoList.vue';
import ToggleAll from './../components/ToggleAll.vue';
import Info from './../components/Info.vue';

const todoStore = useTodoStore();
const route = useRoute();

const currentFilter = computed(() => route.params.filter || 'all');

// 監聽路由變化，根據過濾器設置 store
watch(currentFilter, (newFilter:any) => {
  todoStore.filter = newFilter;
});

onMounted(() => {
  todoStore.fetchTodos();
});

</script>

<template>
  <section class="todoapp">
    <Header />
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
      <template v-if="todoStore.todos.length > 0">
        <ToggleAll />
      </template>
      <TodoList />
    </section>
    <!-- This footer should be hidden by default and shown when there are todos -->
    <Footer />
  </section>
  <Info />
</template>

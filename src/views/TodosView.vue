<script setup lang="ts">
import Header from './../components/Header.vue';
import Footer from './../components/Footer.vue';
import TodoList from './../components/TodoList.vue';
import ToggleAll from './../components/ToggleAll.vue';
import Info from './../components/Info.vue';
</script>

<template>
  <section class="todoapp">
    <Header />
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
      <ToggleAll />
      <TodoList />
    </section>
    <!-- This footer should be hidden by default and shown when there are todos -->
    <Footer />
  </section>
  <Info />
</template>

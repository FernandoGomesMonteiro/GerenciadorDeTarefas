<template>
  <v-app>
    <v-app-bar color="primary" app elevation="2">
      <v-app-bar-title class="d-flex align-center">
        <v-icon icon="mdi-clipboard-check-outline" class="mr-2" />
        Gerenciador de Tarefas
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-brightness-6" @click="toggleTheme" variant="text" />
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1 class="text-h4 mb-6 text-primary font-weight-medium">Minhas Tarefas</h1>
            <TaskFilterControls />
            <TaskGrid />
            <TaskCreateModal />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app class="d-flex flex-column" color="background">
      <div class="px-4 py-2 text-center w-100">
        <span class="text-caption text-medium-emphasis">Gerenciador de Tarefas &copy; {{ new Date().getFullYear() }}</span>
      </div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import TaskFilterControls from '@/components/tasks/TaskFilterControls.vue';
import TaskGrid from '@/components/tasks/TaskGrid.vue';
import TaskCreateModal from '@/components/tasks/TaskCreateModal.vue';
import { useTaskStore } from '@/stores/taskStore';
import { onMounted } from 'vue';
import { useTheme } from 'vuetify';

const taskStore = useTaskStore();
const theme = useTheme();

onMounted(() => {
  taskStore.initializeStore();
  // Verificar se há um tema salvo no localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    theme.global.name.value = savedTheme;
  }
});

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
  localStorage.setItem('theme', theme.global.name.value);
};
</script>

<style>
.v-application {
  font-family: 'Roboto', sans-serif;
}

.text-primary {
  color: rgb(var(--v-theme-primary)) !important;
}
</style>

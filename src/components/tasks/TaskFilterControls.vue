<template>
  <v-card class="filter-card mb-6" flat>
    <v-card-text>
      <div class="filter-container">
        <v-text-field
          v-model="searchQuery"
          label="Buscar tarefas"
          prepend-inner-icon="mdi-magnify"
          clearable
          hide-details="auto"
          class="search-field"
          @click:clear="searchQuery = ''"
        />

        <v-select
          v-model="taskStore.filterStatus"
          :items="filterOptions"
          label="Filtrar por status"
          prepend-inner-icon="mdi-filter-variant"
          item-title="title"
          item-value="value"
          hide-details="auto"
          class="filter-field"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore';
import { ref, watch } from 'vue';

const taskStore = useTaskStore();

// Criar uma referência local para o searchQuery
const searchQuery = ref(taskStore.searchQuery);

// Observar mudanças na referência local e atualizar o store
watch(searchQuery, (newValue) => {
  taskStore.searchQuery = newValue;
});

const filterOptions = [
  { value: 'all', title: 'Todas', icon: 'mdi-view-list' },
  { value: 'pending', title: 'Pendentes', icon: 'mdi-clock-outline' },
  { value: 'completed', title: 'Concluídas', icon: 'mdi-check-circle-outline' }
];
</script>

<style scoped>
.filter-card {
  border-radius: var(--radius-lg);
  background-color: rgba(var(--v-theme-primary), 0.03);
}

.filter-container {
  display: grid;
  gap: 1.5rem;
}

.search-field,
.filter-field {
  border-radius: var(--radius-md);
}

@media (min-width: 768px) {
  .filter-container {
    grid-template-columns: 2fr 1fr;
  }
}
</style>

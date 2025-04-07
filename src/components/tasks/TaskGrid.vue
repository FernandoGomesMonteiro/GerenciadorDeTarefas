<template>
  <div>
    <!-- Modal de edição de tarefa -->
    <TaskEditModal
      v-if="editingTaskId"
      :taskId="editingTaskId"
      @close="editingTaskId = null"
    />
    <div v-if="taskStore.filteredTasks.length === 0" class="empty-state">
      <v-icon icon="mdi-clipboard-text-outline" size="64" color="primary" class="mb-4" />
      <h3 class="text-h5 mb-2">Nenhuma tarefa encontrada</h3>
      <p class="text-body-1 text-medium-emphasis">Adicione uma nova tarefa ou altere os filtros de busca</p>
    </div>

    <div v-else class="task-grid">
      <transition-group name="task-list">
        <v-card
          v-for="task in taskStore.filteredTasks"
          :key="task.id"
          :class="['task-card', { 'task-completed': task.status === 'completed' }]"
          elevation="2"
        >
          <v-card-item class="card-header">
            <template v-slot:prepend>
              <v-checkbox
                :model-value="task.status === 'completed'"
                @update:model-value="taskStore.toggleStatus(task.id)"
                color="success"
                hide-details
              />
            </template>

            <div class="d-flex align-center gap-2">
              <v-btn
                icon="mdi-pencil"
                size="small"
                color="primary"
                variant="text"
                @click.stop="editTask(task.id)"
                class="edit-btn"
              ></v-btn>

              <v-chip
                :color="getDueDateColor(task.dueDate)"
                :prepend-icon="getDueDateIcon(task.dueDate)"
                size="small"
                variant="elevated"
              >
                {{ formatDate(task.dueDate) }}
              </v-chip>
            </div>
          </v-card-item>

          <v-divider></v-divider>

          <div class="card-content">
            <h3 class="task-title">{{ task.title }}</h3>
            <p class="task-description">{{ task.description || 'Sem descrição' }}</p>
            <div class="task-meta">
              <v-icon icon="mdi-clock-outline" size="small" color="secondary" class="mr-1" />
              <span class="text-caption text-medium-emphasis">Criada em {{ formatCreatedDate(task.createdAt) }}</span>
            </div>
          </div>
        </v-card>
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore } from '@/stores/taskStore';
import TaskEditModal from './TaskEditModal.vue';

const taskStore = useTaskStore();
const editingTaskId = ref<string | null>(null);

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

const editTask = (taskId: string) => {
  editingTaskId.value = taskId;
};

const formatCreatedDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const getDueDateColor = (dueDate: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const taskDate = new Date(dueDate);
  taskDate.setHours(0, 0, 0, 0);

  if (taskDate < today) return 'error';
  if (taskDate.getTime() === today.getTime()) return 'warning';
  return 'success';
};

const getDueDateIcon = (dueDate: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const taskDate = new Date(dueDate);
  taskDate.setHours(0, 0, 0, 0);

  if (taskDate < today) return 'mdi-alert-circle';
  if (taskDate.getTime() === today.getTime()) return 'mdi-calendar-today';
  return 'mdi-calendar-check';
};
</script>

<style scoped>
.task-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 1rem;
  background-color: rgba(var(--v-theme-primary), 0.03);
  border-radius: var(--radius-lg);
  margin: 1rem 0;
}

.task-card {
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.task-completed {
  opacity: 0.8;
  background: var(--color-background-soft);
}

.task-completed .task-title {
  text-decoration: line-through;
  color: var(--color-text-light-2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
}

.card-content {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.task-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  line-height: 1.3;
  color: var(--color-heading);
}

.task-description {
  color: var(--color-text-light-2);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  flex: 1;
}

.task-meta {
  display: flex;
  align-items: center;
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: 1px dashed rgba(0,0,0,0.1);
}

.v-theme--dark .task-meta {
  border-top: 1px dashed rgba(255,255,255,0.1);
}

.edit-btn {
  opacity: 0.7;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.task-card:hover .edit-btn {
  opacity: 1;
}

.edit-btn:hover {
  transform: scale(1.1);
}
</style>

<template>
  <v-dialog v-model="dialog" max-width="600" transition="dialog-bottom-transition">
    <v-card class="task-modal">
      <v-toolbar color="primary" class="text-white">
        <v-toolbar-title class="text-h6">
          <v-icon icon="mdi-clipboard-edit-outline" class="mr-2"></v-icon>
          Editar Tarefa
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pt-6">
        <v-form @submit.prevent="submit" ref="form">
          <v-text-field
            v-model="formData.title"
            label="Título da Tarefa"
            prepend-inner-icon="mdi-format-title"
            :rules="[required]"
            autofocus
            class="mb-4"
          ></v-text-field>

          <v-textarea
            v-model="formData.description"
            label="Descrição"
            prepend-inner-icon="mdi-text-box-outline"
            rows="3"
            counter
            maxlength="200"
            class="mb-4"
            placeholder="Descreva os detalhes da tarefa"
          ></v-textarea>

          <v-card flat border class="mb-4 pa-2">
            <div class="d-flex align-center mb-2">
              <v-icon icon="mdi-calendar" color="primary" class="mr-2"></v-icon>
              <span class="text-subtitle-1">Data de Vencimento</span>
            </div>
            <v-date-picker
              v-model="formData.dueDate"
              color="primary"
              elevation="0"
              class="border-0"
              variant="tonal"
              :show-adjacent-months="true"
              :show-week="false"
              width="100%"
              @update:model-value="formData.dueDate = $event"
            ></v-date-picker>
          </v-card>

          <div class="d-flex gap-4 mt-6">
            <v-btn
              color="error"
              variant="outlined"
              @click="dialog = false"
              class="flex-grow-1"
            >
              <v-icon icon="mdi-close" class="mr-1"></v-icon>
              Cancelar
            </v-btn>
            <v-btn
              type="submit"
              color="primary"
              class="flex-grow-1"
              :loading="loading"
              :disabled="!formData.title"
            >
              <v-icon icon="mdi-check" class="mr-1"></v-icon>
              Salvar Alterações
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import { useTaskStore } from '@/stores/taskStore';

const props = defineProps<{
  taskId: string
}>();

const emit = defineEmits(['close']);

const taskStore = useTaskStore();
const dialog = ref(false);
const loading = ref(false);
const form = ref(null);

const formData = reactive({
  title: '',
  description: '',
  dueDate: new Date().toISOString().split('T')[0]
});

// Carregar dados da tarefa quando o componente for montado
const loadTaskData = () => {
  const task = taskStore.tasks.find(t => t.id === props.taskId);
  if (task) {
    formData.title = task.title;
    formData.description = task.description;
    formData.dueDate = task.dueDate;
    dialog.value = true;
  }
};

// Abrir o modal quando o componente for montado
onMounted(() => {
  loadTaskData();
});

const required = (value: string) => !!value || 'Campo obrigatório';

const submit = async () => {
  if (!formData.title) return;

  loading.value = true;
  try {
    // Atualizar a tarefa no store
    await taskStore.updateTask({
      id: props.taskId,
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate
    });
    dialog.value = false;
    emit('close');
  } finally {
    loading.value = false;
  }
};

// Fechar o modal quando o diálogo for fechado
watch(dialog, (isOpen) => {
  if (!isOpen) {
    emit('close');
  }
});
</script>

<style scoped>
.task-modal {
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.v-date-picker {
  width: 100%;
  border-radius: var(--radius-md);
}
</style>

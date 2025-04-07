<template>
    <v-dialog v-model="dialog" max-width="600" transition="dialog-bottom-transition">
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
          class="floating-btn"
          icon="mdi-plus"
          size="large"
          elevation="3"
          fixed
          bottom
          right
        ></v-btn>
      </template>

      <v-card class="task-modal">
        <v-toolbar color="primary" class="text-white">
          <v-toolbar-title class="text-h6">
            <v-icon icon="mdi-clipboard-plus-outline" class="mr-2"></v-icon>
            Nova Tarefa
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
                :min="new Date().toISOString().split('T')[0]"
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
                Criar Tarefa
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </template>

  <script setup lang="ts">
  import { ref, reactive, watch } from 'vue';
  import { useTaskStore } from '@/stores/taskStore';

  const taskStore = useTaskStore();
  const dialog = ref(false);
  const loading = ref(false);
  const form = ref(null);

  // Recuperar dados do formulário do localStorage se existirem
  const savedForm = localStorage.getItem('taskForm');
  const formData = reactive({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0]
  });

  // Se houver dados salvos, carregá-los
  if (savedForm) {
    try {
      const parsed = JSON.parse(savedForm);
      formData.title = parsed.title || '';
      formData.description = parsed.description || '';
      formData.dueDate = parsed.dueDate || new Date().toISOString().split('T')[0];
    } catch (e) {
      console.error('Erro ao carregar formulário salvo:', e);
    }
  }

  // Salvar dados do formulário quando forem alterados
  watch(formData, (newValue) => {
    localStorage.setItem('taskForm', JSON.stringify(newValue));
  }, { deep: true });

  const required = (value: string) => !!value || 'Campo obrigatório';

  const submit = async () => {
    if (!formData.title) return;

    loading.value = true;
    try {
      await taskStore.addTask({
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate
      });
      dialog.value = false;

      // Limpar formulário e localStorage após envio bem-sucedido
      formData.title = '';
      formData.description = '';
      formData.dueDate = new Date().toISOString().split('T')[0];
      localStorage.removeItem('taskForm');
    } finally {
      loading.value = false;
    }
  };

  // Limpar formulário quando o diálogo for fechado
  watch(dialog, (isOpen) => {
    if (!isOpen) {
      // Se o diálogo foi fechado sem enviar, manter os dados para a próxima abertura
    }
  });
  </script>

  <style scoped>
  .floating-btn {
    position: fixed;
    bottom: 4rem; /* Aumentado de 2.5rem para 4rem para evitar que seja cortado */
    right: 2rem;
    z-index: 1000;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .floating-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  .task-modal {
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .v-date-picker {
    width: 100%;
    border-radius: var(--radius-md);
  }
  </style>

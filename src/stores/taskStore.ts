import { defineStore } from 'pinia';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed';
  createdAt: string;
}

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[],
    searchQuery: '',
    filterStatus: 'all' as 'all' | 'pending' | 'completed',
    editTask: null as Task | null
  }),

  actions: {
    initializeStore() {
      try {
        // Carregar tasks
        const savedTasks = localStorage.getItem('tasks');
        this.tasks = savedTasks ? JSON.parse(savedTasks) : [];

        // Carregar filtro com validação
        const savedFilter = localStorage.getItem('filterStatus');
        this.filterStatus = (
          savedFilter === 'pending' ||
          savedFilter === 'completed'
        ) ? savedFilter : 'all';

      } catch (error) {
        console.error('Error initializing store:', error);
        this.resetStore();
      }
    },

    addTask(task: Omit<Task, 'id' | 'createdAt' | 'status'>) {
      const newTask: Task = {
        ...task,
        id: crypto.randomUUID(), // Método mais confiável (requer HTTPS)
        createdAt: new Date().toISOString(),
        status: 'pending'
      };
      this.tasks.unshift(newTask);
      this.persistData();
    },

    updateTask(updatedTask: Partial<Task> & { id: string }) {
      const taskIndex = this.tasks.findIndex(t => t.id === updatedTask.id);
      if (taskIndex !== -1) {
        // Manter o status e a data de criação originais
        const originalTask = this.tasks[taskIndex];
        this.tasks[taskIndex] = {
          ...originalTask,
          title: updatedTask.title || originalTask.title,
          description: updatedTask.description || originalTask.description,
          dueDate: updatedTask.dueDate || originalTask.dueDate
        };
        this.persistData();
      }
    },

    setEditTask(taskId: string | null) {
      if (taskId === null) {
        this.editTask = null;
      } else {
        const task = this.tasks.find(t => t.id === taskId);
        this.editTask = task || null;
      }
    },

    toggleStatus(taskId: string) {
      const task = this.tasks.find(t => t.id === taskId);
      if (task) {
        task.status = task.status === 'pending' ? 'completed' : 'pending';
        this.persistData();
      }
    },

    persistData() {
      try {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        localStorage.setItem('filterStatus', this.filterStatus);
      } catch (error) {
        console.error('Persistência falhou:', error);
      }
    },

    resetStore() {
      this.tasks = [];
      this.filterStatus = 'all';
      localStorage.clear();
    }
  },

  getters: {
    filteredTasks: (state) => {
      return state.tasks
        .filter(task => {
          const matchesStatus = state.filterStatus === 'all' ||
                              task.status === state.filterStatus;
          const matchesSearch = task.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                              task.description.toLowerCase().includes(state.searchQuery.toLowerCase());
          return matchesStatus && matchesSearch;
        })
        .sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  }
});

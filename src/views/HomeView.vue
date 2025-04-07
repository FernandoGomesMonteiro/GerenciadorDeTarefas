<!-- views/HomeView.vue -->
<template>
  <div>
    <TaskFilterControls />
    <TaskGrid />
    <TaskCreateModal />
  </div>
</template>

<script setup lang="ts">
import TaskFilterControls from '@/components/tasks/TaskFilterControls.vue';
import TaskGrid from '@/components/tasks/TaskGrid.vue';
import TaskCreateModal from '@/components/tasks/TaskCreateModal.vue';
</script>
<template>
  <div class="kanban-column">
    <div class="column-header">
      <h3>{{ title }}</h3>
      <span class="task-count">{{ tasks.length }}</span>
    </div>
    
    <div class="column-content" @drop="onDrop" @dragover.prevent @dragenter.prevent>
      <div v-if="tasks.length === 0" class="empty-state">
        <p>📭</p>
        <p>Sin tareas</p>
      </div>
      
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @drag-start="onDragStart"
        @task-deleted="$emit('task-deleted', task.id)"
      />
    </div>
  </div>
</template>

<script>
import TaskCard from './TaskCard.vue'

export default {
  name: 'KanbanColumn',
  components: {
    TaskCard
  },
  props: {
    title: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    tasks: {
      type: Array,
      default: () => []
    }
  },
  emits: ['task-moved', 'task-deleted'],
  data() {
    return {
      draggedTask: null
    }
  },
  methods: {
    onDragStart(taskId) {
      this.draggedTask = taskId
    },
    onDrop() {
      if (this.draggedTask) {
        this.$emit('task-moved', this.draggedTask, this.status)
        this.draggedTask = null
      }
    }
  }
}
</script>

<style scoped>
.kanban-column {
  background: #f8f9fa;
  border-radius: 12px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
}

.kanban-column:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.column-header {
  padding: 1rem 1.5rem;
  border-bottom: 2px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 12px 12px 0 0;
}

.column-header h3 {
  margin: 0;
  color: #495057;
  font-size: 1.1rem;
  font-weight: 600;
}

.task-count {
  background: #e9ecef;
  color: #6c757d;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.column-content {
  padding: 1rem;
  flex: 1;
  min-height: 300px;
  transition: background-color 0.3s ease;
}

.column-content:hover {
  background-color: #f1f3f4;
}

.empty-state {
  text-align: center;
  color: #adb5bd;
  padding: 3rem 1rem;
  font-style: italic;
}

.empty-state p:first-child {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.empty-state p:last-child {
  margin: 0;
  font-size: 0.9rem;
}

/* Drag and drop visual feedback */
.column-content.drag-over {
  background-color: #e3f2fd;
  border: 2px dashed #2196f3;
}

/* Responsive */
@media (max-width: 768px) {
  .kanban-column {
    min-height: 300px;
  }
  
  .column-header {
    padding: 0.75rem 1rem;
  }
  
  .column-header h3 {
    font-size: 1rem;
  }
  
  .column-content {
    padding: 0.75rem;
    min-height: 200px;
  }
}
</style>

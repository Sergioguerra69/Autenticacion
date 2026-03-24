<template>
  <div 
    class="task-card"
    draggable="true"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
  >
    <div class="task-header">
      <span class="task-priority" :class="priorityClass">
        {{ priorityLabel }}
      </span>
      <button @click="deleteTask" class="delete-btn" title="Eliminar tarea">
        🗑️
      </button>
    </div>
    
    <h4 class="task-title">{{ task.title }}</h4>
    
    <p v-if="task.description" class="task-description">
      {{ task.description }}
    </p>
    
    <div class="task-footer">
      <div class="task-author">
        <img 
          :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(task.author)}&background=random`" 
          :alt="task.author"
          class="author-avatar"
        >
        <span class="author-name">{{ task.author }}</span>
      </div>
      
      <span class="task-date" :title="formattedDate">
        {{ timeAgo }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskCard',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  emits: ['drag-start', 'task-deleted'],
  computed: {
    priorityClass() {
      return {
        'priority-high': this.task.priority === 'high',
        'priority-medium': this.task.priority === 'medium',
        'priority-low': this.task.priority === 'low'
      }
    },
    priorityLabel() {
      const labels = {
        high: '🔴 Alta',
        medium: '🟡 Media',
        low: '🟢 Baja'
      }
      return labels[this.task.priority] || '🟡 Media'
    },
    formattedDate() {
      return new Date(this.task.createdAt).toLocaleString()
    },
    timeAgo() {
      const now = new Date()
      const created = new Date(this.task.createdAt)
      const diffInMs = now - created
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
      
      if (diffInHours < 1) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
        return `hace ${diffInMinutes} min`
      } else if (diffInHours < 24) {
        return `hace ${diffInHours}h`
      } else {
        const diffInDays = Math.floor(diffInHours / 24)
        return `hace ${diffInDays}d`
      }
    }
  },
  methods: {
    onDragStart(event) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('text/plain', this.task.id)
      event.target.classList.add('dragging')
      this.$emit('drag-start', this.task.id)
    },
    onDragEnd(event) {
      event.target.classList.remove('dragging')
    },
    deleteTask() {
      if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        this.$emit('task-deleted', this.task.id)
      }
    }
  }
}
</script>

<style scoped>
.task-card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: move;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.task-card.dragging {
  opacity: 0.5;
  transform: rotate(5deg);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.task-priority {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  white-space: nowrap;
}

.priority-high {
  background: #fee;
  color: #c53030;
  border-left-color: #e53e3e;
}

.priority-medium {
  background: #fef5e7;
  color: #d69e2e;
  border-left-color: #ed8936;
}

.priority-low {
  background: #f0fff4;
  color: #38a169;
  border-left-color: #48bb78;
}

.delete-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  opacity: 0.7;
}

.delete-btn:hover {
  background: #fee;
  opacity: 1;
}

.task-title {
  margin: 0 0 0.5rem 0;
  color: #2d3748;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.3;
}

.task-description {
  margin: 0 0 1rem 0;
  color: #4a5568;
  font-size: 0.9rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 0.75rem;
  border-top: 1px solid #e2e8f0;
}

.task-author {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.author-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-size: 0.8rem;
  color: #4a5568;
  font-weight: 500;
}

.task-date {
  font-size: 0.75rem;
  color: #718096;
  font-style: italic;
}

/* Responsive */
@media (max-width: 768px) {
  .task-card {
    padding: 0.75rem;
  }
  
  .task-title {
    font-size: 0.9rem;
  }
  
  .task-description {
    font-size: 0.85rem;
  }
  
  .task-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>

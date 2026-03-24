<template>
  <div class="kanban-board">
    <div class="board-header">
      <h1>Tablero Kanban</h1>
      <button @click="showAddTask = true" class="add-task-btn">
        Nueva Tarea
      </button>
    </div>

    <!-- Modal para agregar nueva tarea -->
    <div v-if="showAddTask" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h3>Crear Nueva Tarea</h3>
        <form @submit.prevent="addTask">
          <div class="form-group">
            <label for="taskTitle">Título:</label>
            <input 
              id="taskTitle"
              v-model="newTask.title" 
              type="text" 
              placeholder="Escribe el título de la tarea..."
              required
            >
          </div>
          
          <div class="form-group">
            <label for="taskDescription">Descripción:</label>
            <textarea 
              id="taskDescription"
              v-model="newTask.description" 
              placeholder="Describe la tarea..."
              rows="3"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="taskPriority">Prioridad:</label>
            <select id="taskPriority" v-model="newTask.priority">
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>
          
          <div class="form-actions">
            <button type="button" @click="closeModal" class="cancel-btn">
              Cancelar
            </button>
            <button type="submit" class="submit-btn">
              Crear Tarea
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Columnas del Kanban -->
    <div class="kanban-columns">
      <KanbanColumn 
        v-for="column in columns" 
        :key="column.id"
        :title="column.title"
        :status="column.status"
        :tasks="getTasksByStatus(column.status)"
        @task-moved="moveTask"
        @task-deleted="deleteTask"
      />
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed } from 'vue'
import { useAuth } from '../contexts/AuthContext'
import KanbanColumn from './KanbanColumn.vue'

export default {
  name: 'KanbanBoard',
  components: {
    KanbanColumn
  },
  setup() {
    const { user } = useAuth()
    
    // Estado del modal
    const showAddTask = ref(false)
    
    // Nueva tarea
    const newTask = reactive({
      title: '',
      description: '',
      priority: 'medium'
    })
    
    // Columnas del Kanban
    const columns = [
      { id: 1, title: 'Por Hacer', status: 'todo' },
      { id: 2, title: 'En Progreso', status: 'in-progress' },
      { id: 3, title: 'Completado', status: 'done' }
    ]
    
    // Tareas (simuladas - en una app real vendrían de una API)
    const tasks = ref([
      {
        id: 1,
        title: 'Configurar autenticación',
        description: 'Implementar Google One Tap en la aplicación',
        status: 'done',
        priority: 'high',
        author: 'Demo User',
        authorEmail: 'demo@example.com',
        createdAt: new Date().toISOString()
      }
    ])
    
    // Obtener tareas por estado
    const getTasksByStatus = (status) => {
      return tasks.value.filter(task => task.status === status)
    }
    
    // Agregar nueva tarea
    const addTask = () => {
      if (!newTask.title.trim()) return
      
      const task = {
        id: Date.now(),
        title: newTask.title,
        description: newTask.description,
        status: 'todo',
        priority: newTask.priority,
        author: user.value.name,
        authorEmail: user.value.email,
        createdAt: new Date().toISOString()
      }
      
      tasks.value.push(task)
      
      // Limpiar formulario y cerrar modal
      Object.assign(newTask, {
        title: '',
        description: '',
        priority: 'medium'
      })
      showAddTask.value = false
    }
    
    // Mover tarea entre columnas
    const moveTask = (taskId, newStatus) => {
      const task = tasks.value.find(t => t.id === taskId)
      if (task) {
        task.status = newStatus
      }
    }
    
    // Eliminar tarea
    const deleteTask = (taskId) => {
      const index = tasks.value.findIndex(t => t.id === taskId)
      if (index > -1) {
        tasks.value.splice(index, 1)
      }
    }
    
    // Cerrar modal
    const closeModal = () => {
      showAddTask.value = false
      Object.assign(newTask, {
        title: '',
        description: '',
        priority: 'medium'
      })
    }
    
    return {
      columns,
      tasks,
      showAddTask,
      newTask,
      getTasksByStatus,
      addTask,
      moveTask,
      deleteTask,
      closeModal
    }
  }
}
</script>

<style scoped>
.kanban-board {
  padding: 1rem;
}

.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.board-header h1 {
  color: #2c3e50;
  font-size: 2rem;
  margin: 0;
}

.add-task-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.add-task-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.kanban-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-content h3 {
  color: #2c3e50;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 600;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.cancel-btn,
.submit-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cancel-btn {
  background: #e1e8ed;
  color: #666;
}

.cancel-btn:hover {
  background: #d1d8dd;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.submit-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .board-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .board-header h1 {
    text-align: center;
  }
  
  .kanban-columns {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .modal-content {
    padding: 1.5rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>

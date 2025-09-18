// src/pages/Home.jsx
import {useState} from "react"
import {useTasks} from "../hooks/useTasks"
import {TaskForm} from "../components/TaskForm"
import {TaskList} from "../components/TaskList"
import {FilterBar} from "../components/FilterBar"

const Home = () => {
  const [editingTask, setEditingTask] = useState(null)
  const {tasks} = useTasks()

  const completedCount = tasks.filter((t) => t.status === "completado").length
  const totalCount = tasks.length

  const handleEdit = (task) => setEditingTask(task)
  const handleCloseEdit = () => setEditingTask(null)

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto", padding: "1rem" }}>
      <h1>Gestor de Tareas</h1>

      {/* 👇 nuevo título dinámico */}
      <h2 style={{ fontSize: "1rem", fontWeight: "normal", color: "#475569" }}>
        Completaste {completedCount} tareas de {totalCount}
      </h2>

      {!editingTask && <TaskForm />}
      <FilterBar />
      {editingTask && (
        <TaskForm initial={editingTask} onClose={handleCloseEdit} />
      )}
      <TaskList onEdit={handleEdit} />
    </div>
  )
}

export {Home}

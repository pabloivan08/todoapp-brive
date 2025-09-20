// src/pages/Home.jsx
import {useState} from "react"
import {useTasks} from "../hooks/useTasks"
import {TaskForm} from "../components/TaskForm"
import {TaskList} from "../components/TaskList"
import {FilterBar} from "../components/FilterBar"
import {Modal} from "../components/Modal"
import {Fab} from "../components/Fab"
import styles from "./Home.module.css"

const Home = () => {
  const [editingTask, setEditingTask] = useState(null)
  const {tasks} = useTasks()
  const [isModalOpen, setModalOpen] = useState(false)

  const completedCount = tasks.filter((t) => t.status === "completado").length
  const totalCount = tasks.length

  const openCreate = () => {
    setEditingTask(null)
    setModalOpen(true)
  }
  
  const handleEdit = (task) => {
    setEditingTask(task)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingTask(null)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tareas Brivé</h1>
      <h2 className={styles.counter}>
        Completaste {completedCount} tarea{completedCount !== 1 && "s"} de {totalCount}
      </h2>

      <FilterBar />
      <TaskList onEdit={handleEdit} />

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        title={editingTask ? "Editar tarea" : "Nueva tarea"}
      >
        <TaskForm initial={editingTask} onClose={closeModal} />
      </Modal>

      <Fab onClick={openCreate} />
    </div>
  )
}

export {Home}

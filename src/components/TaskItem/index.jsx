import { useTasks } from "../../hooks/useTasks"
import styles from "./TaskItem.module.css"

const TaskItem = ({ task, onEdit }) => {
  const { updateTask, deleteTask } = useTasks()

  const toggleStatus = () => {
    const newStatus = task.status === "completado" ? "pendiente" : "completado"
    updateTask(task.id, { status: newStatus })
  }

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <h3>{task.description}</h3>
        <p>{new Date(task.date).toLocaleDateString()}</p>
        <span className={`${styles.status} ${styles[task.status]}`}>
          {task.status}
        </span>
      </div>

      <div className={styles.actions}>
        <button onClick={toggleStatus}>
          {task.status === "completado" ? "Reabrir" : "Completar"}
        </button>
        <button onClick={() => onEdit(task)}>Editar</button>
        <button className={styles.delete} onClick={() => deleteTask(task.id)}>
          Eliminar
        </button>
      </div>
    </div>
  )
}

export {TaskItem}

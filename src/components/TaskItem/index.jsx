import {useTasks} from "../../hooks/useTasks"
import styles from "./TaskItem.module.css"

const TaskItem = ({ task, onEdit }) => {
  const { updateTask, deleteTask } = useTasks()

  const toggleStatus = () => {
    const newStatus = task.status === "completado" ? "pendiente" : "completado"
    updateTask(task.id, { status: newStatus })
  }

  function formatTaskDate(d) {
    if (!d) return "—";
    const dateOnly = typeof d === "string" && d.includes("T") ? d.slice(0, 10) : d;
    const localDate = new Date(`${dateOnly}T00:00:00`);
    if (Number.isNaN(localDate.getTime())) {
      const alt = new Date(d);
      return Number.isNaN(alt.getTime()) ? "—" : alt.toLocaleDateString();
    }
    return localDate.toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
  const dateText = formatTaskDate(task?.date);

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <div className={styles.infoHeader}>
          <span className={`${styles.status} ${styles[task.status]}`}>
            {task.status}
          </span>
          <p>{dateText}</p>
        </div>
        <h3>{task.description}</h3>
        <button className={styles.complete} onClick={toggleStatus}>
          {task.status === "completado" ? "Reabrir" : "Completar"}
        </button>
      </div>

      <div className={styles.actions}>
        <button className={styles.delete} onClick={() => deleteTask(task.id)}>
          X
        </button>
        <button onClick={() => onEdit(task)}>Edit</button>
      </div>
    </div>
  )
}

export {TaskItem}

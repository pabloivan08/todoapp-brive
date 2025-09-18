// src/components/TaskList/TaskList.jsx
import {useMemo} from "react"
import {useTasks} from "../../hooks/useTasks"
import {TaskItem} from "../TaskItem"
import styles from "./TaskList.module.css"

const TaskList = ({ onEdit }) => {
  const { tasks, loading, filter } = useTasks()

  // Filtrar
  const textFiltered = useMemo(() => {
    if (!filter?.q) return tasks
    const q = filter.q.toLowerCase()
    return tasks.filter((t) =>
      (t?.description || "").toLowerCase().includes(q)
    )
  }, [tasks, filter?.q])

  // Ordenar por fecha
  const sorted = useMemo(() => {
    return [...textFiltered].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  }, [textFiltered])

  if (loading) {
    return (
      <div className={styles.state}>
        <div className={styles.spinner} />
        <span>Cargando tareas…</span>
      </div>
    )
  }

  if (!sorted.length) {
    return <div className={styles.empty}>No se encontraron tareas.</div>
  }

  return (
    <ul className={styles.list}>
      {sorted.map((task) => (
        <li key={task.id} className={styles.item}>
          <TaskItem task={task} onEdit={onEdit} />
        </li>
      ))}
    </ul>
  )
}

export {TaskList}

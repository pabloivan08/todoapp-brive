// src/components/TaskList/TaskList.jsx
import {useMemo} from "react"
import {useTasks} from "../../hooks/useTasks"
import {TaskItem} from "../TaskItem"
import styles from "./TaskList.module.css"

const TaskList = ({ onEdit }) => {
  const { tasks, loading, filter } = useTasks()


  const textFiltered = useMemo(() => {
    if (!filter?.q) return tasks
    const q = filter.q.toLowerCase()
    return tasks.filter((t) =>
      (t?.description || "").toLowerCase().includes(q)
    )
  }, [tasks, filter?.q])


  const dateToMillis = (d) => {
    if (!d) return 0
    const s = typeof d === "string" && d.includes("T") ? d.slice(0, 10) : d // "YYYY-MM-DD"
    const dt = new Date(`${s}T00:00:00`)
    return Number.isNaN(dt.getTime()) ? 0 : dt.getTime()
  }

  const sorted = useMemo(() => {
    return [...textFiltered].sort((a, b) => dateToMillis(b.date) - dateToMillis(a.date))
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

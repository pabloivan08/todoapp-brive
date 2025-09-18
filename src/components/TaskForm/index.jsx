// src/components/TaskForm/TaskForm.jsx
import { useEffect, useState } from "react"
import { useTasks } from "../../hooks/useTasks"
import styles from "./TaskForm.module.css"

const TaskForm = ({ initial = null, onClose }) => {
  const { createTask, updateTask } = useTasks()
  const [description, setDescription] = useState(initial?.description || "")
  const [date, setDate] = useState(() => {
    if (!initial?.date) return ""
    
    const d = new Date(initial.date)
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16)
    return local
  })
  const [status, setStatus] = useState("pendiente")
  const [error, setError] = useState("")

  useEffect(() => setError(""), [description, date, status])

  const validate = () => {
    if (!description.trim()) return "La descripción no puede estar vacía."
    if (!date || Number.isNaN(new Date(date).getTime())) return "Fecha inválida."
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate()
    if (v) return setError(v)

    const payload = {
      description: description.trim(),
      date: new Date(date).toISOString(),
      status, // por defecto "pendiente"
    }

    try {
      if (initial) {
        await updateTask(initial.id, payload)
        onClose?.()
      } else {
        await createTask(payload)
        setDescription("")
        setDate("")
        setStatus("pendiente") // reset
      }
    } catch {
      setError("Ocurrió un error al guardar. Intenta de nuevo.")
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        placeholder="Descripción de la tarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className={styles.input}
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.actions}>
        <button type="submit" className={styles.primary}>
          {initial ? "Guardar cambios" : "Agregar"}
        </button>
        {onClose && (
          <button type="button" className={styles.secondary} onClick={onClose}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export { TaskForm }

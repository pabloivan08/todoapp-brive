import { useEffect, useState } from "react"
import { useTasks } from "../../hooks/useTasks"
import styles from "./TaskForm.module.css"


const toDateOnlyString = (value) => {
  if (!value) return ""
  if (typeof value === "string") {
    if (value.includes("T")) return value.slice(0, 10)
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value
  }
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10)
}

const TaskForm = ({ initial = null, onClose }) => {
  const { createTask, updateTask } = useTasks()
  const [description, setDescription] = useState(initial?.description || "")
  const [date, setDate] = useState(() => toDateOnlyString(initial?.date))
  const [error, setError] = useState("")

  useEffect(() => setError(""), [description, date])

  const validate = () => {
    if (!description.trim()) return "La descripción no puede estar vacía."
    if (!date || Number.isNaN(new Date(`${date}T00:00:00`).getTime())) return "Fecha inválida."
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate()
    if (v) return setError(v)

    const payload = {
      description: description.trim(),
      date, 
      status: initial?.status || "pendiente",
    }

    try {
      if (initial) {
        await updateTask(initial.id, payload)
        onClose?.()
      } else {
        await createTask(payload)
        setDescription("")
        setDate("")
      }
    } catch {
      setError("Ocurrió un error al guardar. Intenta de nuevo.")
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        <input
          className={styles.input}
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className={styles.input}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.actions}>
        <button type="submit" className={styles.primary}>
          {initial ? "Guardar Edición" : "Crear Tarea"}
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

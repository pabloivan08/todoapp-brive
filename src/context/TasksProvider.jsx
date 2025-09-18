import { useEffect, useState } from "react"
import { TasksContext } from "./tasks-context"
import api from "../api/api"

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState({ q: "", status: "all" })

  // Crear
  const createTask = async (task) => {
    const { data } = await api.post("/tasks", task)
    if (data && typeof data === "object") {
      setTasks((prev) => [...prev, data])
    }
  }

  // Actualizar
  const updateTask = async (id, updates) => {
    const { data } = await api.patch(`/tasks/${id}`, updates)
    if (data && typeof data === "object") {
      setTasks((prev) => prev.map((t) => (t.id === id ? data : t)))
    }
  }

  // Eliminar
  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`)
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  // Cargar tareas cuando cambie el filtro
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true)
      try {
        const params = {}
        if (filter.q) params.q = filter.q                    
        if (filter.status && filter.status !== "all") params.status = filter.status

        const { data } = await api.get("/tasks", { params })
        Array.isArray(data) ? setTasks(data) : setTasks([])
      } catch (err) {
        console.error("Error fetching tasks:", err)
        setTasks([])
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [filter])

  const value = {
    tasks,
    loading,
    filter,
    setFilter,
    createTask,
    updateTask,
    deleteTask,
  }

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}

export {TasksProvider}
import {useEffect, useRef, useState} from "react"
import {useTasks} from "../../hooks/useTasks"
import styles from "./FilterBar.module.css"

const FilterBar = () => {
  const {filter, setFilter} = useTasks()
  const [text, setText] = useState(filter.q || "")
  const debRef = useRef(null)

  useEffect(() => {
    if (debRef.current) clearTimeout(debRef.current)
    debRef.current = setTimeout(() => {
      setFilter(prev => ({ ...prev, q: text.trim() }))
    }, 300)
    return () => clearTimeout(debRef.current)
  }, [text, setFilter])

  const onStatusChange = (e) => {
    setFilter((prev) => ({ ...prev, status: e.target.value }))
  }

  return (
    <div className={styles.bar}>
      <input
        className={styles.input}
        placeholder="Buscar tarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select className={styles.select} value={filter.status} onChange={onStatusChange}>
        <option value="all">Todas</option>
        <option value="pendiente">Pendientes</option>
        <option value="completado">Completadas</option>
      </select>
    </div>
  )
}

export { FilterBar }

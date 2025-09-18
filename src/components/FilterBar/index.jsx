// src/components/FilterBar/FilterBar.jsx
import { useEffect, useRef, useState } from "react"
import { useTasks } from "../../hooks/useTasks"
import styles from "./FilterBar.module.css"

const FilterBar = () => {
  const { filter, setFilter } = useTasks()
  const [text, setText] = useState(filter.q || "")
  const debRef = useRef(null)

  useEffect(() => {
    if (debRef.current) clearTimeout(debRef.current);
    debRef.current = setTimeout(() => {
      setFilter(prev => ({ ...prev, q: text.trim() }));   // 👈 aquí se manda
    }, 300);
    return () => clearTimeout(debRef.current);
  }, [text, setFilter]);

  const onStatusChange = (e) => {
    setFilter((prev) => ({ ...prev, status: e.target.value }))
  }

  return (
    <div className={styles.bar}>
      <input
        className={styles.input}
        placeholder="Buscar por texto…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select className={styles.select} value={filter.status} onChange={onStatusChange}>
        <option value="all">Todos</option>
        <option value="pendiente">Pendiente</option>
        <option value="en progreso">En progreso</option>
        <option value="completado">Completado</option>
      </select>
    </div>
  )
}

export { FilterBar }

import styles from "./Fab.module.css"

const Fab = ({ onClick, label = "Nueva tarea", title = "Crear nueva tarea" }) => {
  return (
    <button className={styles.fab} onClick={onClick} aria-label={label} title={title}>
      ＋
    </button>
  )
}

export { Fab }
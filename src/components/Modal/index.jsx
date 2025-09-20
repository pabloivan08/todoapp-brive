import { createPortal } from "react-dom"
import { useEffect } from "react"
import styles from "./Modal.module.css"

const Modal = ({ open, title, onClose, children }) => {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === "Escape" && onClose?.()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className={styles.backdrop} onClick={onClose} role="presentation">
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h3 id="modal-title" className={styles.title}>{title}</h3>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body
  )
}

export { Modal }


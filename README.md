# 📝 TodoApp Brive

Aplicación web para gestionar tareas (**ToDo App**) construida con **React + Vite**, usando **Context API** para el manejo del estado, **Axios** para consumo de API REST y **CSS Modules** para los estilos.

## 🚀 Características

- Listar tareas
- Crear nuevas tareas (siempre con estado inicial **pendiente**)
- Editar descripción y fecha de una tarea
- Cambiar estado de una tarea (pendiente ⇄ completado) directamente desde la lista
- Eliminar tareas (con confirmación)
- Filtrar tareas por texto y por estado
- Mostrar conteo dinámico: `Completaste X tareas de Y`
- Modal para crear/editar tareas
- Botón flotante (**FAB**) para crear nuevas tareas

---

## 📦 Requisitos

- Node.js v18+ (se recomienda usar [nvm](https://github.com/nvm-sh/nvm))
- npm o yarn

---

## ⚙️ Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/pabloivann08/todoapp-brive.git
cd todoapp-brive
npm install
```

---

1. Levantar el servidor mock (json-server)

Este proyecto usa json-server para simular una API REST.

```bash
npm run mock:server
```

Esto expone la API en:
👉 http://localhost:4000/tasks

2. Levantar la aplicación React

En otra terminal:

```bash
npm run dev
```

Aplicación en:
👉 http://localhost:5173

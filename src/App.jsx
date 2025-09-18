import './App.css'
import {TasksProvider} from "./context/TasksProvider"
import {Home} from "./pages/Home"

function App() {
  return (
    <TasksProvider>
      <Home />
    </TasksProvider>
  )
}

export default App
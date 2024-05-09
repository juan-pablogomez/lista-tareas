import { useEffect, useState } from 'react'
import { Task } from './components/Task'
import { TaskForm } from './components/TaskForm'
import './App.css'

interface Task {
  id: number,
  taskText: string,
  completed: boolean
}

const App = (): JSX.Element => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const loadedTasks: [] = JSON.parse(localStorage.getItem('tasks') || "")
    if (loadedTasks) {
      setTasks(loadedTasks)
    }
  }, [])

  useEffect(() => {
    if (tasks.length > 0) {
      const json = JSON.stringify(tasks)
      localStorage.setItem('tasks', json)
    }
  }, [tasks])

  const addTask = (newTask: Task) => {
    newTask = {
      id: new Date().getTime(),
      taskText: newTask.taskText,
      completed: false
    }
    setTasks(all => [...all, newTask])
  }

  const handleCompletedTask = ({ id, completed }: { id: number, completed: boolean }): void => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          completed
        }
      }
      return task
    })
    setTasks(newTasks)
  }

  const handleRemoveTask = (id: number): void => {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  }


  return (
    <div className="app-container">
      <h2>Lista de Tareas</h2>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id}>
            <Task
              id={task.id}
              taskText={task.taskText}
              completed={task.completed}
              onRemoveTask={handleRemoveTask}
              onToggleCompleted={handleCompletedTask}
            />
          </li>
        ))}
      </ul>
      <TaskForm addTask={addTask} />
    </div>
  )
}

export default App

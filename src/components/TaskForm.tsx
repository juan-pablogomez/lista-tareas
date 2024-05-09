import { useState } from "react"

interface Props {
  addTask: (task: {id: number, taskText: string, completed: boolean }) => void
}

export const TaskForm: React.FC<Props> = ({addTask}) => {
  const [inputText, setInputTex] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(inputText.trim()) {
      addTask({
        id: new Date().getTime(),
        taskText: inputText,
        completed: false
      })
      setInputTex('')
    }
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value
    setInputTex(value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={inputText} onChange={handleChange} placeholder="Ingrese su nueva tarea" />
      <button type="submit">Agregar tarea</button>
    </form>
  )
}
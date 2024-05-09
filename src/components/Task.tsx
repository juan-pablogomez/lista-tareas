import { TrashIcon } from "../icons/Trash-icon"

interface Props {
  id: number
  taskText: string
  completed: boolean
  onRemoveTask: (id: number) => void
  onToggleCompleted: ({ id, completed }: { id: number, completed: boolean }) => void
}

export const Task: React.FC<Props> = ({ id, taskText, completed, onRemoveTask, onToggleCompleted }) => {
  const handleChangeCkeckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onToggleCompleted({ id, completed: event.target.checked })
  }

  return (
    <div className={`task-container ${completed ? 'task-completed' : ''}`}>
      <label className="checkbox-container">
        <input className="checkbox-input" type="checkbox" checked={completed} onChange={handleChangeCkeckbox} />
        <div className="checkbox-span"></div>
      </label>
      <p> {taskText} </p>
      <button className="delete-btn" onClick={() => onRemoveTask(id)}>
        <TrashIcon />
      </button>
    </div>
  )
}
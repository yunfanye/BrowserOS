import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { cn } from '@/sidepanel/lib/utils'
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react'
import { z } from 'zod'

// Task schema for runtime validation
const TaskSchema = z.object({
  id: z.string(),  // Unique identifier for each task
  status: z.string(),  // Task completion status
  content: z.string(),  // Task description
  order: z.number().optional(),  // Order for drag & drop
  isEditable: z.boolean().default(true)  // Whether task can be edited
})

type Task = z.infer<typeof TaskSchema>

interface TaskManagerDropdownProps {
  content: string
  className?: string
  isEditable?: boolean
  onTasksChange?: (tasks: Task[]) => void
  onExecute?: (tasks: Task[]) => void
  onCancel?: () => void
}

export function TaskManagerDropdown({ content, className, isEditable = false, onTasksChange, onExecute, onCancel }: TaskManagerDropdownProps) {
  const [isExpanded, setIsExpanded] = useState(isEditable)
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const [localTasks, setLocalTasks] = useState<Task[]>([])
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)
  const editInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editingTaskId && editInputRef.current) {
      editInputRef.current.focus()
      editInputRef.current.select()
    }
  }, [editingTaskId])

  // Parse markdown content into task objects
  const tasks = useMemo(() => {
    const lines = content.split('\n')
    
    const parsedTasks = lines
      .map((line, index) => {
        const trimmed = line.trim()
        if (!trimmed.startsWith('- [ ]') && !trimmed.startsWith('- [x]')) return null
        
        const isCompleted = trimmed.startsWith('- [x]')
        const taskContent = trimmed.replace(/^- \[[x ]\] /, '')
        
        return {
          id: `task-${index}`,
          status: isCompleted ? '✓' : '○',
          content: taskContent,
          order: index,
          isEditable: true
        }
      })
      .filter(Boolean) as Task[]

    if (isEditable && parsedTasks.length > 0) {
      setLocalTasks(parsedTasks)
    }

    return parsedTasks
  }, [content, isEditable])

  // Use local tasks if in edit mode, otherwise use parsed tasks
  const displayTasks = isEditable ? localTasks : tasks

  const completedCount = useMemo(() => {
    return displayTasks.filter(task => task.status === '✓').length
  }, [displayTasks])

  const startEdit = useCallback((task: Task) => {
    setEditingTaskId(task.id)
    setEditText(task.content)
  }, [])

  const saveEdit = useCallback(() => {
    if (!editingTaskId) return

    const updatedTasks = localTasks.map(task =>
      task.id === editingTaskId
        ? { ...task, content: editText.trim() }
        : task
    )
    setLocalTasks(updatedTasks)
    setEditingTaskId(null)
    setEditText('')

    // Notify parent of changes
    onTasksChange?.(updatedTasks)
  }, [editingTaskId, editText, localTasks, onTasksChange])

  const cancelEdit = useCallback(() => {
    setEditingTaskId(null)
    setEditText('')
  }, [])

  // Add new task at the end of the list
  const addTask = useCallback(() => {
    const newTask = {
      id: `task-${Date.now()}`,
      status: '○',
      content: 'New step',
      order: localTasks.length,
      isEditable: true
    }
    const updatedTasks = [...localTasks, newTask]
    setLocalTasks(updatedTasks)
    onTasksChange?.(updatedTasks)
    
    // Start editing immediately for better UX
    setTimeout(() => startEdit(newTask), 50)
  }, [localTasks, onTasksChange, startEdit])

  const deleteTask = useCallback((taskId: string) => {
    const updatedTasks = localTasks.filter(task => task.id !== taskId)
      .map((task, index) => ({ ...task, order: index }))
    setLocalTasks(updatedTasks)
    onTasksChange?.(updatedTasks)
  }, [localTasks, onTasksChange])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      saveEdit()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      cancelEdit()
    }
  }, [saveEdit, cancelEdit])

  // Handle drag start for reordering tasks
  const handleDragStart = useCallback((e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId)
    e.dataTransfer.effectAllowed = 'move'
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  const handleDrop = useCallback((e: React.DragEvent, targetTaskId: string) => {
    e.preventDefault()
    if (!draggedTaskId || draggedTaskId === targetTaskId) return

    const draggedIndex = localTasks.findIndex(t => t.id === draggedTaskId)
    const targetIndex = localTasks.findIndex(t => t.id === targetTaskId)

    if (draggedIndex === -1 || targetIndex === -1) return

    const newTasks = [...localTasks]
    const [draggedTask] = newTasks.splice(draggedIndex, 1)
    newTasks.splice(targetIndex, 0, draggedTask)

    const reorderedTasks = newTasks.map((task, index) => ({ ...task, order: index }))
    setLocalTasks(reorderedTasks)
    setDraggedTaskId(null)
    onTasksChange?.(reorderedTasks)
  }, [draggedTaskId, localTasks, onTasksChange])

  const isTaskCompleted = (task: Task) => task.status === '✓'
  const MAX_VISIBLE_TASKS = isEditable ? 20 : 6
  const visibleTasks = displayTasks.slice(0, MAX_VISIBLE_TASKS)
  const hasMoreTasks = displayTasks.length > MAX_VISIBLE_TASKS

  if (displayTasks.length === 0 && !isEditable) {
    return (
      <div className={cn("my-1", className)}>
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm text-foreground">Task Manager</span>
        </div>
        <div className="mt-1 text-xs text-muted-foreground">No tasks available</div>
      </div>
    )
  }

  return (
    <div className={cn("my-1", className)}>
      {/* Header */}
      {!isEditable && (
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm text-foreground">Task Manager</span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors ml-4"
            aria-label={isExpanded ? 'Collapse task list' : 'Expand task list'}
          >
            <span>{completedCount}/{displayTasks.length} completed</span>
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      )}

      {/* Expanded Task List */}
      {isExpanded && (
        <div className="space-y-0 max-h-64 overflow-y-auto pb-4">
          {visibleTasks.map((task, index) => (
            <div key={task.id} className="group/step">
              <div
                className={cn(
                  "flex items-center gap-2 py-1.5 px-1 text-xs",
                  isEditable && "hover:bg-muted/20",
                  draggedTaskId === task.id && "opacity-50"
                )}
                draggable={isEditable && editingTaskId !== task.id}
                onDragStart={(e) => handleDragStart(e, task.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, task.id)}
              >
                {/* Step number */}
                <span className="text-muted-foreground font-medium min-w-[50px]">
                  Step {index + 1}
                </span>
                
                {/* Task content */}
                <div className="flex-1 min-w-0">
                  {editingTaskId === task.id ? (
                    <input
                      ref={editInputRef}
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onBlur={saveEdit}
                      className="w-full px-1 py-0.5 text-xs bg-transparent border-b border-border focus:outline-none focus:border-brand"
                      placeholder="Enter step description..."
                    />
                  ) : (
                    <div
                      className={cn(
                        "truncate text-foreground",
                        isEditable && "cursor-pointer"
                      )}
                      onClick={isEditable ? () => startEdit(task) : undefined}
                      title={task.content}
                    >
                      {task.content}
                    </div>
                  )}
                </div>

                {/* Delete button */}
                {isEditable && editingTaskId !== task.id && (
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover/step:opacity-100 p-0.5 hover:bg-red-50 text-red-400 hover:text-red-600 rounded transition-all"
                    title="Delete step"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
              
              {/* Add step line below each step on hover */}
              {isEditable && (
                <div className="group/add-line relative opacity-0 group-hover/step:opacity-100 transition-opacity">
                  <div className="h-px bg-border mx-4" />
                  <button
                    onClick={() => {
                      const newTask = {
                        id: `task-${Date.now()}`,
                        status: '○',
                        content: 'New step',
                        order: index + 1,
                        isEditable: true
                      }
                      const updatedTasks = [...localTasks]
                      updatedTasks.splice(index + 1, 0, newTask)
                      updatedTasks.forEach((t, i) => t.order = i)
                      setLocalTasks(updatedTasks)
                      onTasksChange?.(updatedTasks)
                      setTimeout(() => startEdit(newTask), 50)
                    }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border border-border rounded-full p-1 hover:bg-muted transition-all text-muted-foreground hover:text-foreground"
                    title="Add step below"
                  >
                    <Plus className="w-2.5 h-2.5" />
                  </button>
                </div>
              )}
            </div>
          ))}

          {hasMoreTasks && (
            <div className="text-xs text-muted-foreground text-center py-2">
              ... and {displayTasks.length - MAX_VISIBLE_TASKS} more steps
            </div>
          )}

          {/* Add first step when no steps exist */}
          {isEditable && visibleTasks.length === 0 && (
            <div className="group/empty relative py-2">
              <div className="h-px bg-border mx-4" />
              <button
                onClick={addTask}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border border-border rounded-full p-1 hover:bg-muted transition-all text-muted-foreground hover:text-foreground"
                title="Add first step"
              >
                <Plus className="w-2.5 h-2.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Action buttons */}
      {isEditable && (
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onExecute?.(localTasks)}
            className="px-3 py-1 bg-brand text-white text-xs rounded hover:bg-brand/90 transition-colors"
          >
            Run Agent
          </button>
          <button
            onClick={onCancel}
            className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded hover:bg-muted/80 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

    </div>
  )
}
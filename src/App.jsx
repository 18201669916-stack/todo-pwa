import React, { useEffect, useState } from 'react'
import { Container, AppBar, Toolbar, Typography, Paper } from '@mui/material'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'

const STORAGE_KEY = 'pwa-task-manager.tasks.v1'

export default function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setTasks(JSON.parse(raw))
    } catch (e) {
      console.warn('Failed to load tasks from localStorage', e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (e) {
      console.warn('Failed to save tasks to localStorage', e)
    }
  }, [tasks])

  const addTask = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const newTask = {
      id: Date.now().toString(),
      text: trimmed,
      completed: false,
      createdAt: Date.now()
    }
    setTasks((s) => [newTask, ...s])
  }

  const toggleComplete = (id) => {
    setTasks((s) => s.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTask = (id) => {
    setTasks((s) => s.filter(t => t.id !== id))
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">PWA 任务管理器</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" style={{ marginTop: 16 }}>
        <Paper style={{ padding: 16 }} elevation={2}>
          <TaskInput onAdd={addTask} />
          <TaskList tasks={tasks} onToggle={toggleComplete} onDelete={deleteTask} />
        </Paper>
      </Container>
    </div>
  )
}

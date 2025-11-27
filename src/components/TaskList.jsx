import React from 'react'
import { List, ListItem, ListItemText, Checkbox, IconButton, ListItemSecondaryAction, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export default function TaskList({ tasks = [], onToggle, onDelete }) {
  if (!tasks || tasks.length === 0) {
    return <Typography variant="body2">暂无任务，添加一个开始吧。</Typography>
  }

  return (
    <List>
      {tasks.map((t) => (
        <ListItem key={t.id} divider>
          <Checkbox checked={!!t.completed} onChange={() => onToggle(t.id)} />
          <ListItemText
            primary={t.text}
            secondary={new Date(t.createdAt).toLocaleString()}
            style={{ textDecoration: t.completed ? 'line-through' : 'none' }}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={() => onDelete(t.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )
}

import React, { useState } from 'react'
import { Box, TextField, Button } from '@mui/material'

export default function TaskInput({ onAdd }) {
  const [value, setValue] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onAdd(value)
    setValue('')
  }

  return (
    <Box component="form" onSubmit={submit} sx={{ display: 'flex', gap: 1, mb: 2 }}>
      <TextField
        label="新增任务"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        fullWidth
        size="small"
        autoFocus
      />
      <Button variant="contained" type="submit">添加</Button>
    </Box>
  )
}

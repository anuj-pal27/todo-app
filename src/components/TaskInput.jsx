import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Paper,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Tooltip,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { addTodo } from '../store/slices/todoSlice';

const TaskInput = () => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isOutdoor, setIsOutdoor] = useState(false);
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(
        addTodo({
          text: text.trim(),
          priority,
          isOutdoor,
          location: isOutdoor ? location.trim() : '',
        })
      );
      setText('');
      setPriority('medium');
      setIsOutdoor(false);
      setLocation('');
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 3,
        background: 'linear-gradient(145deg, #ffffff 0%, #f5f7fa 100%)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          alignItems: 'flex-start',
        }}
      >
        <TextField
          fullWidth
          label="Add a new task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'primary.main',
              },
            },
          }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            label="Priority"
            onChange={(e) => setPriority(e.target.value)}
            sx={{
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
            }}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={isOutdoor}
              onChange={(e) => setIsOutdoor(e.target.checked)}
              color="primary"
            />
          }
          label="Outdoor Activity"
        />
        {isOutdoor && (
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city name"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        )}
        <Tooltip title="Add Task">
          <IconButton
            type="submit"
            color="primary"
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
};

export default TaskInput; 
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Paper,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Tooltip,
  Fade,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toggleTodo, deleteTodo } from '../store/slices/todoSlice';

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'success';
    default:
      return 'default';
  }
};

const TaskList = () => {
  const { items, loading, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 200,
          width: '100%',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
        {error}
      </Alert>
    );
  }

  if (items.length === 0) {
    return (
      <Paper
        elevation={3}
        sx={{
          p: 3,
          textAlign: 'center',
          background: 'linear-gradient(145deg, #ffffff 0%, #f5f7fa 100%)',
          width: '100%',
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No tasks yet. Add one to get started!
        </Typography>
      </Paper>
    );
  }

  return (
    <List sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {items.map((todo) => (
        <Fade in={true} key={todo.id}>
          <Paper
            elevation={2}
            sx={{
              mb: 2,
              background: 'linear-gradient(145deg, #ffffff 0%, #f5f7fa 100%)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateX(4px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              },
              width: '100%',
              maxWidth: '600px',
            }}
          >
            <ListItem
              dense
              sx={{
                py: 2,
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.02)',
                },
              }}
            >
              <Checkbox
                edge="start"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo(todo.id))}
                sx={{
                  color: 'primary.main',
                  '&.Mui-checked': {
                    color: 'primary.main',
                  },
                }}
              />
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Typography
                      variant="body1"
                      sx={{
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        color: todo.completed ? 'text.secondary' : 'text.primary',
                      }}
                    >
                      {todo.text}
                    </Typography>
                    <Tooltip title={`Priority: ${todo.priority}`}>
                      <Chip
                        label={todo.priority}
                        size="small"
                        color={getPriorityColor(todo.priority)}
                        sx={{ height: 20 }}
                      />
                    </Tooltip>
                    {todo.weather && (
                      <Tooltip
                        title={`${todo.weather.temperature}°C - ${todo.weather.description}`}
                      >
                        <Chip
                          icon={
                            <img
                              src={`http://openweathermap.org/img/wn/${todo.weather.icon}@2x.png`}
                              alt="weather"
                              style={{ width: 20, height: 20 }}
                            />
                          }
                          label={`${todo.weather.temperature}°C`}
                          size="small"
                          sx={{
                            height: 20,
                            '& .MuiChip-icon': {
                              width: 20,
                              height: 20,
                            },
                          }}
                        />
                      </Tooltip>
                    )}
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <Tooltip title="Delete">
                  <IconButton
                    edge="end"
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    sx={{
                      color: 'error.main',
                      '&:hover': {
                        backgroundColor: 'error.lighter',
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          </Paper>
        </Fade>
      ))}
    </List>
  );
};

export default TaskList; 
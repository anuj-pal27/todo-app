import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import { loadTodos } from '../store/slices/todoSlice';
import { logout } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100vw',
        bgcolor: '#f5f7fa',
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Container maxWidth="md">
          <Toolbar 
            sx={{ 
              justifyContent: 'space-between',
              px: 0,
              minHeight: { xs: 56, sm: 64 },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography
                variant={isMobile ? "h6" : "h5"}
                component="div"
                sx={{
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                }}
              >
                Todo App
              </Typography>
            </Box>
            <Tooltip title="Logout">
              <IconButton
                color="inherit"
                onClick={handleLogout}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.2)',
                  },
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Container>
      </AppBar>

      <Container
        maxWidth="md"
        sx={{
          mt: { xs: 2, sm: 4 },
          mb: { xs: 2, sm: 4 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          <Grid item xs={12}>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              sx={{
                mb: { xs: 2, sm: 3 },
                fontWeight: 600,
                color: theme.palette.primary.main,
              }}
            >
              My Tasks
            </Typography>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 2,
                background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              }}
            >
              <TaskInput />
              <TaskList />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TodoList; 
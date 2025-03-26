import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWeather } from '../../services/weatherService';

export const loadTodos = createAsyncThunk(
  'todos/loadTodos',
  async (_, { rejectWithValue }) => {
    try {
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (todo, { rejectWithValue }) => {
    try {
      const weather = todo.isOutdoor ? await getWeather(todo.location) : null;
      const newTodo = {
        ...todo,
        id: Date.now(),
        completed: false,
        weather,
      };
      return newTodo;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    toggleTodo: (state, action) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem('todos', JSON.stringify(state.items));
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.items));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(loadTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
        localStorage.setItem('todos', JSON.stringify(state.items));
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer; 
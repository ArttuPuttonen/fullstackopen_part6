import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    voteAnecdote(state, action) {
      const id = action.payload.id;
      const anecdoteToChange = state.find(anecdote => anecdote.id === id);
      if (anecdoteToChange) {
        anecdoteToChange.votes = action.payload.votes;
      }
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));
  };
};

export const voteForAnecdote = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    const anecdoteToChange = state.anecdotes.find(anecdote => anecdote.id === id);
    if (anecdoteToChange) {
      const updatedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 };
      const changedAnecdote = await anecdoteService.updateAnecdote(id, updatedAnecdote);
      dispatch(voteAnecdote(changedAnecdote));
    }
  };
};

export default anecdoteSlice.reducer;

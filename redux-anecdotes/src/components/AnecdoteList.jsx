import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteForAnecdote, initializeAnecdotes } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';
import Filter from './Filter';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  useEffect(() => {
    console.log('Anecdotes:', anecdotes);
  }, [anecdotes]);

  const filteredAnecdotes = useMemo(() => {
    return anecdotes
      .filter((anecdote) => {
        if (typeof anecdote.content !== 'string') {
          console.error('Invalid anecdote content:', anecdote);
          return false;
        }
        return anecdote.content.toLowerCase().includes(filter.toLowerCase());
      })
      .sort((a, b) => b.votes - a.votes);
  }, [anecdotes, filter]);

  const vote = (id, content) => {
    dispatch(voteForAnecdote(id));
    dispatch(showNotification(`You voted '${content}'`, 5));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
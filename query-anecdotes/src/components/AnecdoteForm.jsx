import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '/Users/arttuputtonen/Desktop/fullstack_kurssi/fullstackopen_part6/query-anecdotes/requests';

const AnecdoteForm = () => {
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes');
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    if (content.length < 5) {
      alert('Anecdote must be at least 5 characters long');
      return;
    }
    mutation.mutate({ content, votes: 0 });
    setContent('');
  };

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={onCreate}>
        <input
          name="anecdote"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;






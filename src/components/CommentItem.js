import React from 'react';

// import { Container } from './styles';

export default function CommentItem({ comment }) {
  return (
    <li>
      <header>
        <strong>{comment.name}</strong>
      </header>
      <p>{comment.body}</p>
    </li>
  );
}

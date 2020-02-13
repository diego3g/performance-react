import React, { useState, useEffect, useCallback, useMemo } from 'react';
import api from 'axios';
import { uuid } from 'uuidv4';

import CommentList from './CommentList';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');

  useEffect(() => {
    api.get('https://jsonplaceholder.typicode.com/posts?_embed=comments').then(response => {
      setPosts(response.data);
    })
  }, []);

  const addNewPost = useCallback((e) => {
    e.preventDefault();

    setPosts([{
      id: uuid(),
      title: newPostTitle,
      body: newPostBody,
      comments: [],
    }, ...posts])

    setNewPostTitle('');
    setNewPostBody('');
  }, [newPostBody, newPostTitle, posts]);

  const postList = useMemo(() => posts.map(post => ({
    ...post,
    titleMin: post.title.length > 40 ? post.title.substr(0, 40).concat('...') : post.title,
  })), [posts])

  return (
    <>
      <form onSubmit={addNewPost}>
        <input
          placeholder="Título do post"
          onChange={e => setNewPostTitle(e.target.value)}
          value={newPostTitle}
        />

        <textarea
          placeholder="Corpo do post"
          onChange={e => setNewPostBody(e.target.value)}
          value={newPostBody}
        />

        <button type="submit">Publicar</button>
      </form>
      <div className="post-list">
        {postList.map(post => (
          <article key={post.id}>
            <strong>{post.titleMin}</strong>
            <p>{post.body}</p>
      
            <CommentList comments={post.comments} />
          </article>
        ))}
      </div>
    </>
  );
}

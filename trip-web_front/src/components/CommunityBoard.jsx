import React, { useState } from 'react';

const CommunityBoard = () => {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');

  const handleNewPostChange = (e) => {
    setNewPostText(e.target.value);
  };

  const handleNewPostSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: posts.length + 1,
      text: newPostText,
      comments: []
    };
    setPosts([...posts, newPost]);
    setNewPostText('');
  };

  const handleCommentSubmit = (postId, commentText) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, commentText]
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <div>
      <h1>커뮤니티 게시판</h1>
      <div>
        <form onSubmit={handleNewPostSubmit}>
          <textarea value={newPostText} onChange={handleNewPostChange} placeholder="새로운 게시물 작성..." />
          <button type="submit">게시</button>
        </form>
      </div>
      <div>
        {posts.map(post => (
          <div key={post.id}>
            <p>{post.text}</p>
            <CommentList postId={post.id} comments={post.comments} onSubmit={handleCommentSubmit} />
          </div>
        ))}
      </div>
    </div>
  );
};

const CommentList = ({ postId, comments, onSubmit }) => {
  const [newCommentText, setNewCommentText] = useState('');

  const handleNewCommentChange = (e) => {
    setNewCommentText(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    onSubmit(postId, newCommentText);
    setNewCommentText('');
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <input type="text" value={newCommentText} onChange={handleNewCommentChange} placeholder="댓글 작성..." />
        <button type="submit">댓글 작성</button>
      </form>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityBoard;

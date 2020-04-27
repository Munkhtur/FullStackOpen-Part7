import React, { useState } from 'react';
import { createNewBlog } from '../reducers/blogReducer';
import { connect } from 'react-redux';
import { notifyWith } from '../reducers/notificationReducer';

const BlogForm = ({ createNewBlog, notifyWith }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });
  const { title, author, url } = newBlog;
  const handleCreate = async (e) => {
    e.preventDefault();
    createNewBlog(newBlog);
    notifyWith(`${newBlog.title} is created`, 'success');
    setNewBlog({ title: '', author: '', url: '' });
  };

  return (
    <form onSubmit={handleCreate}>
      <div className='form-group'>
        <h1>Create Blog</h1>
        <label>title</label>
        <input
          className='form-control'
          id='title'
          type='text'
          value={title}
          name='title'
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, title: target.value })
          }
        />
      </div>
      <div className='form-group'>
        <label> author</label>
        <input
          className='form-control'
          id='author'
          type='text'
          value={author}
          name='author'
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, author: target.value })
          }
        />
      </div>
      <div className='form-group'>
        <label>url</label>
        <input
          className='form-control'
          id='url'
          type='text'
          value={url}
          name='url'
          onChange={({ target }) =>
            setNewBlog({ ...newBlog, url: target.value })
          }
        />
      </div>
      <button id='create-button' type='submit'>
        Create
      </button>
    </form>
  );
};

export default connect(null, { createNewBlog, notifyWith })(BlogForm);

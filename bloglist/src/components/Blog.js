import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { notifyWith } from '../reducers/notificationReducer';
import { initializeBlogs } from '../reducers/blogReducer';
import { useRouteMatch, Link, useHistory } from 'react-router-dom';
import { removeBlog, likeBlog } from '../reducers/blogReducer';
import { addComment } from '../services/blogs';

const Blog = ({
  blogs,
  likeBlog,
  notifyWith,
  initializeBlogs,
  removeBlog,
  addComment,
}) => {
  const [values, setValues] = useState('');
  console.log(values);
  const history = useHistory();
  useEffect(() => {
    console.log('blog useeffect');
    initializeBlogs();
  }, []);

  console.log(blogs);
  const match = useRouteMatch('/blog/:id');
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null;
  // const [likes, setLikes] = useState(0);

  let userLoggedin;
  const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
  if (loggedUserJSON) {
    userLoggedin = JSON.parse(loggedUserJSON);
  }

  if (!blog) {
    return null;
  }
  console.log(blog);
  const userBlog = { ...blog.user };
  const loggedUsername = userLoggedin
    ? userLoggedin.user.username
    : 'someone random';

  const handleLike = async () => {
    const updateBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    await likeBlog(updateBlog);
    notifyWith(`You liked ${updateBlog.title}`);
  };

  const deleteBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id);
    const answer = window.confirm(`Do you want to delete ${blog.title}?`);
    if (answer) {
      try {
        await removeBlog(id);
        notifyWith(`${blog.title} is removed`);
        history.push('/');
      } catch (error) {
        console.log(error.response);
        notifyWith(`${error.response.data.error}`, 'error');
      }
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    const comment = {
      content: values,
      id: blog.id,
    };
    addComment(comment);
    setValues('');
  };

  return (
    <div className='bloglist'>
      <div>
        <div className='display'>
          <h1>
            <i>{blog.title}</i> by {blog.author}{' '}
          </h1>
        </div>

        <div className='displayNone'>
          <Link to='#'>{blog.url}</Link>
          <div className='likeCount'>
            <span className='count'>{blog.likes} Likes</span>
            <button className='btn' onClick={handleLike}>
              Like
            </button>{' '}
          </div>
          <p>added by {userBlog.username}</p>
          {userBlog.username === loggedUsername && (
            <button
              className='delete-button btn'
              onClick={() => deleteBlog(blog.id)}
            >
              delete
            </button>
          )}
        </div>
        <div>
          <input
            className='form-control'
            name='comment'
            onChange={(e) => setValues(e.target.value)}
          />
          <button className='btn' onClick={handleComment}>
            Add Comment
          </button>
        </div>
        {blog.comments.map((c) => (
          <li key={c.id}>{c.content}</li>
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  blogs: state.blogs,
});

export default connect(mapStateToProps, {
  likeBlog,
  notifyWith,
  initializeBlogs,
  removeBlog,
  addComment,
})(Blog);

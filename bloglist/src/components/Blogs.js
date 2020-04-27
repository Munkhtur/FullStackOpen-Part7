import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import { Link } from 'react-router-dom';

const Blogs = ({ blogs }) => {
  const blogFormRef = React.createRef();
  const byLikes = (b1, b2) => b2.likes - b1.likes;
  const user = JSON.parse(window.localStorage.getItem('loggedNoteappUser'));

  console.log(blogs.comments);
  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm />
      </Togglable>
    );
  };

  const createForm = () => {
    return (
      <Togglable buttonLabel='Create Blog' ref={blogFormRef}>
        <BlogForm />
      </Togglable>
    );
  };

  return (
    <div>
      <h2>blogs</h2>

      {!user ? loginForm() : createForm()}
      <div className='blog-titles'>
        {blogs.sort(byLikes).map((blog) => (
          <li key={blog.id}>
            <Link to={`/blog/${blog.id}`}>
              {' '}
              <div className='title'>
                {' '}
                {blog.title} - {blog.author}
              </div>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  blogs: state.blogs,
  auth: state.auth,
});

export default connect(mapStateToProps)(Blogs);

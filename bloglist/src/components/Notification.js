import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ notifications }) => {
  if (notifications === null) {
    return null;
  }
  return <div className={notifications.type}>{notifications.content}</div>;
};

const mapStateToProps = (state) => ({
  notifications: state.notifications,
});

export default connect(mapStateToProps)(Notification);

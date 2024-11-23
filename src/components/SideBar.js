import React from 'react';
import GroupComponent from './Groups';
import UserComponent from './Users';
import '../Sidebar.css';

const Sidebar = React.memo(() => {
  console.log("Rendering Sidebar");
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Chats</h2>
      <UserComponent />
      <GroupComponent />
    </div>
  );
});

export default Sidebar;

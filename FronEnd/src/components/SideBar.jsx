// components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <NavLink to="/dashboard" className="sidebar-link">
        Usuarios
      </NavLink>
      <NavLink to="/add-task" className="sidebar-link">
        Tareas
      </NavLink>
      <NavLink to="/planets" className="sidebar-link">
        Planetas
      </NavLink>
    </div>
  );
}

export default Sidebar;

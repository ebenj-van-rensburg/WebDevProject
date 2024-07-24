import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-700 text-white w-64 h-screen p-6 fixed top-0 left-0">
      <h2 className="text-2xl font-bold mb-6"></h2>
      <nav>
        <ul>
          <li className="mb-4">
            <NavLink to="/" activeClassName="font-bold" exact>
              Home
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink to={`/profile/${localStorage.getItem('userId')}`} activeClassName="font-bold">
              Profile
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink to="/site-settings" activeClassName="font-bold">
              Site Settings
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink to="/settings" activeClassName="font-bold">
              User Settings
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink to="/forums" activeClassName="font-bold">
              Forums
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink to="/babylon" activeClassName="font-bold">
              Babylon.js
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
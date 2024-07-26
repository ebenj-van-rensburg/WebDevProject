import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`bg-light-wood dark:bg-dark-wood text-dark-wood dark:text-light-wood p-6 fixed top-16 h-full shadow-lg ${isOpen ? 'w-64' : 'w-20'} transition-width duration-300`}>
      <button className="absolute top-4 right-4 md:hidden" onClick={() => setIsOpen(!isOpen)}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
      <div className="flex flex-col justify-between h-full">
        <div>
          <h2 className="text-2xl font-bold mb-6">{user ? `Hello, ${user.username}` : 'Hello there.'}</h2>
          <nav>
            <ul className="space-y-4">
              <li>
                <NavLink to="/" activeClassName="font-bold" exact className="hover:underline">Home</NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink to={`/profile/${user._id}`} activeClassName="font-bold" className="hover:underline">Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to="/settings" activeClassName="font-bold" className="hover:underline">Settings</NavLink>
                  </li>
                  <li>
                    <NavLink to="/site-settings" activeClassName="font-bold" className="hover:underline">Site Settings</NavLink>
                  </li>
                </>
              )}
              <li>
                <NavLink to="/forums" activeClassName="font-bold" className="hover:underline">Forums</NavLink>
              </li>
              <li>
                <NavLink to="/babylon" activeClassName="font-bold" className="hover:underline">Babylon.js</NavLink>
              </li>
            </ul>
          </nav>
          <div className="mt-4">
          <ThemeToggle />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
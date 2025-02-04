import React from 'react';
import { Link } from 'react-router-dom';
import './h.css'

const Navbar = () => {
  return (
    <div>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        
        </li>
        <li>
          <Link to="/farmers">Farmers</Link>
        </li>
        <li>
          <Link to="/researchs">Research</Link>
        </li>
        <li>
          <Link to="/feedBack">FeedBack</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default Navbar;

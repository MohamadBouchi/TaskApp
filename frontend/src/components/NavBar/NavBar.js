import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

function NavBar(props) {
  return (
    <div>
        <ul className='navmenu'>
            <li>
        <NavLink to='Dashboard'>dasjboard</NavLink>
            </li>
            <li>
        <NavLink to='Auth'>auth</NavLink>

            </li>
        </ul>
    </div>
  )
}

export default NavBar;
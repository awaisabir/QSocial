import React from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';


export default ({fetched, success, navStatus, logout}) => {
  return (
    <Menu secondary>
      <Menu.Item><NavLink to="/home"><Menu.Item name='Home'/></NavLink></Menu.Item>
      <Menu.Menu position='right'>
        {navStatus == null || !navStatus.authenticationReducer.loggedIn ? 
          <Menu.Item><NavLink to="/register"><Menu.Item name='Register'/></NavLink></Menu.Item> :
          null
        }
        {navStatus == null || !navStatus.authenticationReducer.loggedIn ? 
          <Menu.Item><NavLink to="/login"><Menu.Item name='Login'/></NavLink></Menu.Item> :
          null 
        }
        {navStatus != null && navStatus.authenticationReducer.loggedIn ? 
          <Menu.Item><NavLink to="/profile"><Menu.Item name='Profile'/></NavLink></Menu.Item> 
          : null
        }
        {navStatus != null && navStatus.authenticationReducer.loggedIn ? 
          <Menu.Item onClick={logout}>Logout</Menu.Item> 
          : null
        }
      </Menu.Menu>
    </Menu>
  );
}
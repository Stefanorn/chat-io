import React from 'react';
import './index.css';
import AllChatRooms from '../AllChatRooms';
import { NavLink } from 'react-router-dom';
import userConnectedIcon from '../../images/userConnectedIcon.png';


const ToolTip = () => (
    <div className="tooltip-container">
        <NavLink to="/login"><img className="tooltip-icon" src={userConnectedIcon}/></NavLink>
        <AllChatRooms/>
    </div>
);

export default ToolTip;
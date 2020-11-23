import React, {useEffect, useContext} from 'react';
import { addUser }from '../../actions/UserActions';
import { connect } from 'react-redux';
import {LOCALSTORAGE_USERNAME} from '../../constants';
import SocketContext from "../../contexts/SocketContext";
import './index.css';
import PropTypes from 'prop-types';


const Container = ({ children, addUser }) =>{
    const socket = useContext(SocketContext); 
    useEffect(() => {
        if(localStorage.getItem(LOCALSTORAGE_USERNAME) !== null){
            let username = localStorage.getItem(LOCALSTORAGE_USERNAME);
            socket.socket.emit('adduser', username, (available) => {
                if(available === true){
                    addUser( { userName: username, isLogedIn: available } );
                }
            });
        }
    },[]);

    return( 
        <div className="container">{children}</div>
        )
    };

Container.propTypes = {
    children : PropTypes.element,
    addUser : PropTypes.func.isRequired
};

export default connect(null,{addUser})(Container);
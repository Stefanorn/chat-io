import React,{useContext} from 'react';
import SocketContext from "../../contexts/SocketContext";
import PropTypes from 'prop-types';

const OptCtrl = ({action, userObj, buttonText = "OptActionButton"}) => {
    
    const socket = useContext(SocketContext); 

    const emitEventOnClick = ()=>{
        socket.socket.emit( action, userObj , cb=>{if(cb){}})
    }

    return (<button onClick={()=>emitEventOnClick()}>{buttonText}</button>)
}

OptCtrl.propTypes = {
    action: PropTypes.oneOf(["op","ban","deop","kick"]).isRequired,
    buttonText: PropTypes.string,
    userObj: PropTypes.shape({
        user: PropTypes.string.isRequired,
        room: PropTypes.string.isRequired
    }).isRequired

};

export default OptCtrl;
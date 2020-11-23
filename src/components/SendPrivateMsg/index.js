import React,{useState,useContext} from 'react';
import socketContext from "../../contexts/SocketContext";
import PropTypes from 'prop-types';



const SendPrivateMsg = ({user}) => {
    const [message, setMessage] = useState("");
    const socket = useContext(socketContext); 

    const SendPrivateMsg = ()=> {
        const msg = {
            nick: user, 
            message: message
        }
        socket.socket.emit("privatemsg", msg, cb=>{ 
            if(cb){ }
        });
        setMessage("");
    }
    return(<div>
                <input value={message} onChange={e=>setMessage(e.target.value)}></input>
                <button onClick={()=>SendPrivateMsg()}>Send</button>
            </div>)
};

SendPrivateMsg.propTypes = {
    user : PropTypes.string.isRequired
};


export default SendPrivateMsg;
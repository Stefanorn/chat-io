import React,{useState} from 'react';
import './index.css';
import PropTypes from 'prop-types';


const CreateNewRoom = ({addNewRoom}) => {
    const [roomName, setRoomName] = useState("");
    const CreateNewRoom = () => {
        addNewRoom(roomName);
        setRoomName("");
    }
    return (<div className="create-new-room-container">
        <label>Name of room :</label>
        <input 
            type="text" 
            value={roomName} 
            onChange={ (e) => {setRoomName(e.target.value)} }></input>
            <button onClick={()=>CreateNewRoom()}>Submit</button>
    </div>);
}

CreateNewRoom.propTypes = {
    addNewRoom : PropTypes.func.isRequired
};

export default CreateNewRoom;
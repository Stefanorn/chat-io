import React from 'react';
import onclickoutside from 'react-onclickoutside';
import { NavLink } from 'react-router-dom';
import SocketContext from "../../contexts/SocketContext";
import channelListIcon from '../../images/channelListIcon.png';
import './index.css';
import { connect } from 'react-redux';
import CreateNewRoom from '../CreateNewRoom';
import PropTypes from 'prop-types';

class AllChatRooms extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            createNewRoom: false,
            listOpen: false,
            rooms: []
        }
    }
    componentDidMount(){
    }
    
    

   onclickoutside(){
        this.setState({ listOpen: false });
    }

    toggleList(){
        this.setState(prevState => ({ listOpen: !prevState.listOpen }));

        const { socket } = this.context;
        socket.emit("rooms");
        socket.on("roomlist", rooms => {
                console.log("new rooms")
                var roomTitleArray = [];
                Object.getOwnPropertyNames(rooms).forEach((name)=>{
                    roomTitleArray.push(name);
                });
                this.setState({rooms: roomTitleArray});

        }) 
      }
    toggleCreateNewRoom(){
        this.setState({createNewRoom: !this.state.createNewRoom});
    }
    handleAddNewRoom(e){
        const{rooms, } = this.state;
        let temp = rooms;
        temp.push(e);
        this.setState({rooms: temp});
        this.setState(prevState => ({ createNewRoom: !prevState.createNewRoom }));
    }

    render() {
        const{listOpen, rooms, createNewRoom} = this.state;
        return(
            <div className="dd-wrapper">
                <div onClick={() => this.toggleList()}>
                {listOpen
                  ? <img src={channelListIcon} className="selected tooltip-icon"/>
                  : <img src={channelListIcon} className="tooltip-icon"/> 
                }
            </div>
                {listOpen && <ul className="dd-list">
                {this.props.User.isLogedIn
                ?<>
                {rooms.map((room) => (
                    <NavLink to={"/chatroom/"+room} className="dd-list-item" key={room} >{room}</NavLink>
                ))}
                <button onClick={()=>{this.toggleCreateNewRoom()}}>Create New</button>
                {createNewRoom
                ? <CreateNewRoom  addNewRoom={(e)=>this.handleAddNewRoom(e)}/>
                : null
                }
                </>
                :<></>}
              </ul>}
            </div>
    )}

};

AllChatRooms.contextType = SocketContext;

const mapStateToProp = reduxStoreState => {
    return {User: reduxStoreState};
}; 

AllChatRooms.propTypes = {
    User : PropTypes.shape({
        userName: PropTypes.string.isRequired, 
        isLogedIn: PropTypes.bool.isRequired
    }).isRequired
};

export default connect(mapStateToProp)(AllChatRooms);
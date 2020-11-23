import React from 'react';
import SocketContext from "../../contexts/SocketContext";
import { connect } from 'react-redux';
import { addUser } from '../../actions/UserActions';
import './index.css';
import {LOCALSTORAGE_USERNAME} from '../../constants';
import PropTypes from 'prop-types';


class SelectUsername extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username : "",
            userNameTaken : false
        };
    }

    login(){
        const { socket } = this.context;
        const { username } = this.state;
        socket.emit('adduser', username, (available) => {
            if(available === true){
                this.props.addUser( { userName: username, isLogedIn: available } );
                this.setState({username: ""});
                this.setState({userNameTaken : false});
              localStorage.setItem(LOCALSTORAGE_USERNAME, username );
            }
            else{
                this.setState({userNameTaken : true});
            }
        });
    }
    logout(){
        const { socket } = this.context;
        this.props.addUser( { userName: "", isLogedIn: false } );
        this.setState({username: ""});
        localStorage.removeItem(LOCALSTORAGE_USERNAME);
        socket.emit("disconnect");
    }
    render() {
        const { username,userNameTaken } = this.state;
        const { User } = this.props;

        return(
            <div className="SelectUsername-container">
                { userNameTaken
                    ? <p>This username is in use or longer than 21 charecters, pliz try another one</p>
                    : <></>            
                }
                {User.isLogedIn
                ?   <>
                        <p>You are loged in as {User.userName}</p>
                        <button onClick={() => {this.logout()}}>LogOut</button>
                    </>
                : <> 
                    <p for="username">Select Username: </p>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={username} 
                        onChange={e => this.setState({username: e.target.value})}
                    />
                    <button 
                        type="button"
                        onClick={() => this.login()}>LogIn</button>
                 </> }
            </div>
    )}

};

SelectUsername.contextType = SocketContext;

const mapStateToProp = reduxStoreState => {
    return {User: reduxStoreState};
};

SelectUsername.propTypes = {
    User : PropTypes.shape({
        userName: PropTypes.string.isRequired, 
        isLogedIn: PropTypes.bool.isRequired
    }).isRequired,
    addUser : PropTypes.func.isRequired
};


export default connect(mapStateToProp,{ addUser })( SelectUsername );
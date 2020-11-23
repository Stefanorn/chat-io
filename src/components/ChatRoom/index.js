import React from 'react';
import socketContext from "../../contexts/SocketContext";
import { connect, createSelectorHook } from 'react-redux';
import './index.css';
import User from '../User';
import PropTypes from 'prop-types';

// TODO stíla text message field

class ChatRoom extends React.Component{ 

    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            opsList: [],
            chatHistory: [],
            topic: "no topic",
        }
    }

    //TODO brjóta þennan compment upp
    componentDidMount(){
        const { socket } = this.context;
        const { chatRoomName,User } = this.props;
        if(User.isLogedIn) {
            socket.emit( "joinroom", 
                { room: chatRoomName, pass: ""},
                connection=> {
                    if (connection){
                    }
                });
        }
        socket.on("updatetopic",(roomName,topic)=>{
            if(roomName === chatRoomName){
                this.setState({topic:topic});
            }
        })
        
        socket.on("updatechat",(roomName, chatHistory)=>{
            if(roomName === chatRoomName){
                this.setState({chatHistory: chatHistory});
            }
        });

        socket.on("updateusers",( roomName ,userList, opsList)=>{
            if(roomName === chatRoomName){
                let userArray = [];
                let opsArray = [];
                Object.getOwnPropertyNames(userList).forEach((user)=>{
                    userArray.push(user);
                });
                Object.getOwnPropertyNames(opsList).forEach((user)=>{
                    opsArray.push(user);
                });

                this.setState({
                    userList: userArray,
                    opsList: opsArray 
                });

            }
        });
        this.emitServerMessage(chatRoomName);
        this.recivePrivateMessage();
      }

    //TODO ekki kalla á this.componentDidMount
    componentDidUpdate(prevProps) {
    if (this.props.chatRoomName !== prevProps.chatRoomName) {
            this.disconnectUser(prevProps.chatRoomName);
            this.componentDidMount();
        }
    }

    componentWillUnmount(){
        this.disconnectUser(this.props.chatRoomName);
    }
    

    disconnectUser(roomName){
        const { socket } = this.context;
        socket.emit("partroom",roomName);
    }
    recivePrivateMessage(){
        const { socket } = this.context;
        socket.on("recv_privatemsg", (username, message)=>{
            let updatedChat = this.state.chatHistory;
            updatedChat.push({ timestamp: new Date(), nick: username, message: `*** ${message} ***`});
            this.setState({chatHistory: updatedChat}); 
            console.log("recived privat messgae");
        });
    }

    //TODO þetta spammar user hafa tól til að mute þetta
    emitServerMessage(currRoom){
        const { socket } = this.context;
        socket.on("servermessage", (event, room, user) => {
            if(room === currRoom){
                let updatedChat = this.state.chatHistory;
                updatedChat.push({ timestamp: new Date(), nick: "server", message: `${user} ${event} the room ${room}`});
                this.setState({chatHistory: updatedChat});
            }
        });
    }



    handleSendMessage(event){
        const { socket } = this.context;
        const {chatRoomName} = this.props;

        socket.emit( "sendmsg", 
        {   roomName: chatRoomName,
            msg: event.target.value
        } );
    }

    handleSelectUser(userObj){
        console.log(userObj);
    }

    render(){
        const { userList, opsList,chatHistory,topic } = this.state
        const { chatRoomName } = this.props;

        return(
        <div className="chatroom-container">
            <div className="topic-container"><h3>{topic}</h3></div>
            <div className="text-container"> 
                { chatHistory.map((chat)=>(<p key={chat.timestamp}>{chat.nick} : {chat.message}</p>))}
            </div>
            <div className="connected-user-container">
                { opsList.map((name)=>(
                    <div key={name}>
                        <User name={name}
                              curruserIsOps={true}
                              roomOpsList={opsList}
                              room={chatRoomName}
                        />

                </div>))}

                { userList.map((name)=>(
                    <div key={name}>
                        <User name={name}
                              curruserIsOps={false}
                              roomOpsList={opsList}
                              room={chatRoomName}
                        />
                    </div>))}
            </div>
            <input 
            className="chat-text-input" 
            type="text" 
            onKeyDown={e=>{ if(e.key === "Enter"){
                this.handleSendMessage(e);
                e.target.value = "";
            }}}/>
        </div>
    )};

}
ChatRoom.contextType = socketContext;

const mapStateToProp = reduxStoreState => {
    return {User: reduxStoreState};
};

ChatRoom.propTypes = {
    User : PropTypes.shape({
        userName: PropTypes.string.isRequired, 
        isLogedIn: PropTypes.bool.isRequired
    }).isRequired,
    chatRoomName : PropTypes.string
};

ChatRoom.defaultProps = {
    chatRoomName : "lobby" 
};


export default connect(mapStateToProp)(ChatRoom);
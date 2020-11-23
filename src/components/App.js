import React from 'react';
import Container from './Container';
import Banner from './Banner';
import ToolTip from './ToolTip';
import { Switch, Route } from 'react-router-dom';
import SelectUsername from './SelectUsername';
import AllChatRooms from './AllChatRooms';
import socketContext from "../contexts/SocketContext";
import ChatRoom from './ChatRoom';


class App extends React.Component {

  componentDidMount(){
    const { socket } = this.context;
    socket.on()
    
  }

  render(){
    return (
      <div className="App">
        <Container>
          <Banner header="Welcome"/>
          <ToolTip/>
          <div className="site-content">
            <Switch>
                  <Route exact path="/login" render={ () => <SelectUsername/> } />
                  <Route exact path="/chatroom/:chatroomName" render={ (e) => <ChatRoom chatRoomName={e.match.params.chatroomName}/> } />
            </Switch>
          </div>
        </Container>
      </div>
    );
  }
}

App.contextType = socketContext;

export default App;


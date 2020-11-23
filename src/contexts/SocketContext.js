import { createContext } from 'react';
import connectToSocketIOServer from "socket.io-client";
import {CONNECTION_STRING} from '../constants';
const socketContext = createContext({
    socket: connectToSocketIOServer(CONNECTION_STRING)
})

export default socketContext;
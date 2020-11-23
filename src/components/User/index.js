import React,{useState} from 'react';
import SendPrivateMsg from '../SendPrivateMsg';
import { connect } from 'react-redux';
import OptCtrl from '../OptCtrl';
import './index.css';
import PropTypes from 'prop-types';

const User = ({name, curruserIsOps = false, roomOpsList = [],User,room = "lobby"}) => {

    const [isSelected, setIsSelected] = useState(false);
    const logedInUserISOps = ()=> {
        return roomOpsList.includes(User.userName);
    }
    return( <div>
                <div onClick={()=>setIsSelected(!isSelected)}>
                    {curruserIsOps
                        ?<p>* {name}</p>
                        :<p>{name}</p>
                    }
                </div>
                <div>
                    {isSelected && name !== User.userName
                        ? <div className="user-action-container">
                            <SendPrivateMsg user={name}/>
                            {logedInUserISOps()
                            ?<>
                                {curruserIsOps
                                ?<OptCtrl
                                        action="deop"
                                        userObj={{user : name, room : room}}
                                        buttonText="deop user"  
                                />
                                :<> <OptCtrl
                                        action="op"
                                        userObj={{user : name, room : room}}
                                        buttonText="Op user"                    
                                />
                                    <OptCtrl
                                        action="ban"
                                        userObj={{user : name, room : room}}
                                        buttonText="banUser"
                                    />
                                    <OptCtrl
                                        action="kick"
                                        userObj={{user : name, room : room}}
                                        buttonText="KickUser"
                                    /> </>
                                }
                            </>
                            : null
                            } 
                          </div>
                        :null
                    }
                </div>
            </div>)
};
const mapStateToProp = reduxStoreState => {
    return {User: reduxStoreState};
};

User.propTypes = {
    User : PropTypes.shape({
        userName: PropTypes.string.isRequired, 
        isLogedIn: PropTypes.bool.isRequired
    }).isRequired,
    name : PropTypes.string.isRequired,
    curruserIsOps : PropTypes.bool,
    roomOpsList : PropTypes.array,
    room : PropTypes.string,
};

export default connect(mapStateToProp)(User);

import { ADD_USERNAME } from '../constants';

export default function(state = { userName: "", isLogedIn: false}, action) {
    switch (action.type) {
        case ( ADD_USERNAME ): return action.payload;
        default: return state;
    }
}
import { ADD_USERNAME } from '../constants';

export const addUser = user => {
    return ({
        type: ADD_USERNAME,
        payload: user,
})};
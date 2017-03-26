import * as types from '../constants/usersActionsConst';
import _ from 'lodash';

const initialState = {
    searchFilter: '',
    searchedUsers: {}
};

export default function (state = initialState, {type, payload}) {
    switch(type) {
        case types.fetchUsersByFilterStringRequest:
            return {
                ...state,
                searchFilter: payload
            };
        case types.fetchUsersByFilterStringSuccess:
            return {
                ...state,
                searchedUsers: payload
            };
        case types.fetchUsersByFilterStringError:
            console.log(type, payload);
            return {
                ...state,
                searchedUsers: {}
            };
        case types.resetUsersReducer:
            return initialState;

        case types.addUserToFriendsByIdRequest:
            return state;
        case types.addUserToFriendsByIdSuccess:
            delete state.searchedUsers[payload['recipient']['id']];
            return {...state};
        case types.addUserToFriendsByIdError:
            console.log(type, payload);
            return state;
        default: return state;
    }
}
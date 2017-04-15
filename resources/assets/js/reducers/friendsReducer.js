import * as types from '../constants/friendshipsActionsConst';
import _ from 'lodash';
import { addUserToFriendsByIdSuccess } from '../constants/usersActionsConst';

const initialState = {
    friends: {},
    online: {},
    isLoadingMessages: {},
    messages: {}
};

export default function friendsReducer(state = initialState, {type, payload}) {
    switch (type) {
        case types.getFriendsRequest:
            return state;
        case types.getFriendsSuccess:
            return {
                ...state,
                friends: _.mapKeys(payload, 'id')
            };
        case types.getFriendsError:
            console.log(type, payload);
            return state;

        case types.loadFriendMessagesRequest:
            state.isLoadingMessages[payload.id] = false;
            return {
                ...state
            };
        case types.loadFriendMessagesSuccess:
            delete state.isLoadingMessages[payload.id];
            state.messages[payload.id] = payload.res;
            return {
                ...state
            };
        case types.loadFriendMessagesError:
            delete state.isLoadingMessages[payload.id];
            console.log(type, payload.error);
            return {...state};

        case types.createFriendMessageRequest:
            return state;
        case types.createFriendMessageSuccess:
            if(state.messages[payload.id]) {
                state.messages[payload.id] = state.messages[payload.id].concat(payload.res);
            }
            return {...state};
        case types.createFriendMessageError:
            console.log(type, payload);
            return state;

        case types.deleteUserFromFriendsRequest:
            return state;
        case types.deleteUserFromFriendsSuccess:
            delete state.friends[payload.id];
            return {
                ...state,
                friends: {...state.friends}
            };
        case types.deleteUserFromFriendsError:
            console.error(type, payload);
            return state;

        case addUserToFriendsByIdSuccess:
            return {
                ...state,
                friends: {
                    ...state.friends,
                    [payload.id]: payload
                }
            };


        default: return state;
    }
}
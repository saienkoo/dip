import React from 'react';
import { connect } from 'react-redux';

import Container from '../ContentContainer';
import Messages from '../Messages/Messages';
import FriendProfile from './FriendProfile';
import { push } from 'react-router-redux';

import { createFriendMessage, deleteFriend } from '../../actions/friendsActions';

import '../../styles/FriendStyles.scss';

class FriendContainer extends React.Component {
    constructor(props) {
        super(props);

        this.onSubmitMessage = this.onSubmitMessage.bind(this);
        this.state = {
            openedProfile: false
        };
    }

    onSubmitMessage(text) {
        let { id } = this.props;
        this.props.createFriendMessage(this.props.id, text);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.id != this.props.id) {
            this.state.openedProfile = false;
        }
    }

    render() {
        let { messages, id, user_id, friend, onDeleteClick } = this.props;
        return (
            <Container left={true} right={false}>
                <div className="friend-container-offline">
                    {friend && <div
                        className="profile-label"
                        onClick={() => this.setState({openedProfile: !this.state.openedProfile})}
                    >
                        {friend.name} {this.state.openedProfile ? "\u00AB" : "\u00BB"}
                    </div>
                    }
                    {
                        !this.state.openedProfile &&
                        <Messages
                            messages={messages}
                            onSubmitMessage={this.onSubmitMessage}
                            user_id={user_id}
                            id={id}
                        />
                    }
                    {
                        this.state.openedProfile &&
                            <FriendProfile
                                friend={friend}
                                onDeleteClick={onDeleteClick}
                            />
                    }
                </div>
            </Container>
        );
    }
}

export default connect(
    (state, r) => ({
        id: r.params.id,
        friend: state['friendsReducer']['friends'][r.params.id],
        messages: state['friendsReducer']['messages'][r.params.id],
        user_id: state['currentUserReducer']['user'].id
    }),
    dispatch => ({
        createFriendMessage: (id, text) => dispatch(createFriendMessage(id, text)),
        onDeleteClick: (id) => dispatch(deleteFriend(id))
    })
)(FriendContainer);
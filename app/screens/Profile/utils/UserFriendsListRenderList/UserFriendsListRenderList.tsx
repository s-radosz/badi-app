import React from 'react';
import ListItem from './../../../../components/Utils/ListItem';
import {API_URL} from './../../../../helpers/globalVariables';
import {useSelector} from 'react-redux';

const UserFriendsListRenderList = (props: any) => {
    const userData = useSelector((state: any) => state?.User?.details);

    return (
        <React.Fragment>
            {props.userFriendsList &&
                props.userFriendsList.map((friendsPair: any, i: number) => {
                    if (friendsPair?.users_invited_by_me?.id === userData?.id) {
                        return (
                            <ListItem
                                API_URL={API_URL}
                                key={`users_invited_me-${i}`}
                                image={`${friendsPair.users_invited_me.photo_path}`}
                                mainText={`${friendsPair.users_invited_me.name}, ${friendsPair.users_invited_me.age}`}
                                subText={`${
                                    friendsPair.users_invited_me.location_string
                                        ? friendsPair.users_invited_me
                                              .location_string
                                        : ''
                                }`}
                                subSubText={''}
                                onPress={() => {
                                    props.navigation.push('UserDetails', {
                                        userId: friendsPair.users_invited_me.id,
                                        showBtns: true,
                                    });
                                }}
                                userHadUnreadedMessages={false}
                            />
                        );
                    } else if (
                        friendsPair?.users_invited_by_me?.id !== userData?.id
                    ) {
                        return (
                            <ListItem
                                API_URL={API_URL}
                                key={`users_invited_by_me-${i}`}
                                image={`${friendsPair.users_invited_by_me.photo_path}`}
                                mainText={`${friendsPair.users_invited_by_me.name}, ${friendsPair.users_invited_by_me.age}`}
                                subText={`${
                                    friendsPair.users_invited_by_me
                                        .location_string
                                        ? friendsPair.users_invited_by_me
                                              .location_string
                                        : ''
                                }`}
                                subSubText={''}
                                onPress={() => {
                                    props.navigation.push('UserDetails', {
                                        userId: friendsPair.users_invited_by_me
                                            .id,
                                        showBtns: true,
                                    });
                                }}
                                userHadUnreadedMessages={false}
                            />
                        );
                    }
                })}
        </React.Fragment>
    );
};

export default UserFriendsListRenderList;

import React from 'react';
import ListItem from './../../../../components/Utils/ListItem';
import {API_URL} from './../../../../helpers/globalVariables';
import {useSelector} from 'react-redux';

interface IUserFriendsListRenderListProps {
    userFriendsList: any;
    navigation: any;
}

const UserFriendsListRenderList = ({
    userFriendsList,
    navigation,
}: IUserFriendsListRenderListProps) => {
    const userData = useSelector((state: any) => state?.User?.details);
    const userId = useSelector((state: any) => state?.User?.details?.id);

    return (
        <React.Fragment>
            {userFriendsList &&
                userFriendsList.map((friendsPair: any, i: number) => {
                    if (friendsPair?.users_invited_by_me?.id === userData?.id) {
                        return (
                            <ListItem
                                API_URL={API_URL}
                                key={`users_invited_me-${i}`}
                                image={`${friendsPair.users_invited_me.photo_path}`}
                                mainText={`${friendsPair.users_invited_me.name}`}
                                subText={`${
                                    friendsPair.users_invited_me.location_string
                                        ? friendsPair.users_invited_me
                                              .location_string
                                        : ''
                                }`}
                                subSubText={''}
                                onPress={() => {
                                    navigation?.navigate('Profile', {
                                        foreignUserId:
                                            userId !==
                                            friendsPair.users_invited_me.id
                                                ? friendsPair.users_invited_me
                                                      .id
                                                : null,
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
                                mainText={`${friendsPair.users_invited_by_me.name}`}
                                subText={`${
                                    friendsPair.users_invited_by_me
                                        .location_string
                                        ? friendsPair.users_invited_by_me
                                              .location_string
                                        : ''
                                }`}
                                subSubText={''}
                                onPress={() => {
                                    navigation?.navigate('Profile', {
                                        foreignUserId:
                                            userId !==
                                            friendsPair.users_invited_by_me.id
                                                ? friendsPair
                                                      .users_invited_by_me.id
                                                : null,
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

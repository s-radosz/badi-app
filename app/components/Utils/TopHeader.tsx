import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';

type ITopHeader = {
    title: string;
    onClose: any;
    ignoreBottomMargin?: boolean;
};

const TopHeader = ({title, onClose, ignoreBottomMargin}: ITopHeader) => {
    return (
        <Appbar
            style={[
                styles.topBar,
                ignoreBottomMargin ? null : {marginBottom: 30},
            ]}>
            <Appbar.Header style={styles.topBarBack}>
                <Appbar.BackAction onPress={onClose} />
            </Appbar.Header>
            <Appbar.Content title={title} />
        </Appbar>
    );
};

const styles = StyleSheet.create({
    topBar: {
        // position: 'absolute',
        // left: 0,
        // right: 0,
        // top: 0,
        backgroundColor: '#fff',
    },
    topBarBack: {
        backgroundColor: '#fff',
        elevation: 0,
    },
});

export default TopHeader;

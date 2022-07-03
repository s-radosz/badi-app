import React, {Component} from 'react';
import {View, Image, SafeAreaView} from 'react-native';
import styles from './../style';
import PageHeader from './../../SharedComponents/PageHeader';
import ButtonComponent from './../../Utils/ButtonComponent';
import TextAreaComponent from './../../Utils/TextAreaComponent';
import {GlobalContext} from './../../../Context/GlobalContext';
import BottomPanel from './../../SharedComponents/BottomPanel';
import {withNavigation} from 'react-navigation';
import Alert from './../../Alert/Alert';
import lang from './../../../assets/lang/Auctions/utils/ProductMessageBox';
import axios from 'axios';

const loaderImage: any = require('./../../../assets/images/loader.gif');

interface ProductMessageBoxProps {
    sendNewConversationProduct: any;
    changeShowProductMessageBox: any;
    navigation: any;
}

interface ProductMessageBoxState {
    message: string;
}

class ProductMessageBox extends Component<
    ProductMessageBoxProps,
    ProductMessageBoxState
> {
    constructor(props: ProductMessageBoxProps) {
        super(props);
        this.state = {
            message: '',
        };
    }

    componentDidMount = () => {
        const {navigation} = this.props;

        //@ts-ignore
        this.focusListener = navigation.addListener('willFocus', () => {
            //@ts-ignore
            let API_URL = this.context.API_URL;
            //@ts-ignore
            let loggedInUser = this.context.userData.id;
            let searchedUser = navigation.state.params.receiverId;
            let productId = navigation.state.params.productId;

            //console.log(["ProductMessageBox", loggedInUser, searchedUser, productId]);

            axios
                .post(API_URL + '/checkIfUsersBelongsToProductConversation', {
                    loggedInUser: loggedInUser,
                    searchedUser: searchedUser,
                    productId: productId,
                })
                .then(response => {
                    if (
                        response.data.status === 'OK' &&
                        response.data.result === true
                    ) {
                        navigation.navigate('Auctions', {});
                    }
                });
        });
    };

    componentWillUnmount() {
        // Remove the event listener
        //@ts-ignore
        this.focusListener.remove();
    }

    setMessage = (message: string) => {
        this.setState({message: message});
    };

    sendNewConversationProduct = (message: string) => {
        if (message) {
            //@ts-ignore
            let API_URL = this.context.API_URL;
            //@ts-ignore
            let senderId = this.context.userData.id;
            let receiverId = this.props.navigation.state.params.receiverId;
            let productId = this.props.navigation.state.params.productId;
            let openDetailsId = 0;

            //@ts-ignore
            this.context.setShowLoader(true);

            axios
                .post(API_URL + '/saveConversationProduct', {
                    senderId: senderId,
                    receiverId: receiverId,
                    message: message,
                    productId: productId,
                })
                .then(async response => {
                    if (response.data.status === 'OK') {
                        openDetailsId = response.data.result.id;
                    }
                })
                .then(async response => {
                    axios.post(API_URL + '/addNotification', {
                        type: 'started_conversation_user',
                        //@ts-ignore
                        message: `User ${this.context.userData.name} send you product message`,
                        userId: receiverId,
                        //@ts-ignore
                        senderId: this.context.userData.id,
                        openDetailsId: openDetailsId,
                    });

                    //@ts-ignore
                    await this.context.setShowLoader(false);
                })
                .then(async res => {
                    //@ts-ignore
                    this.context.setAlert(
                        true,
                        'success',
                        lang.sendMessageSuccess['pl'],
                    );

                    this.props.navigation.push('ConversationDetails', {
                        conversationId: openDetailsId,
                        receiverId: receiverId,
                    });
                })
                .catch(async error => {
                    //@ts-ignore
                    await this.context.setAlert(
                        true,
                        'danger',
                        lang.sendMessageError['pl'],
                    );

                    //@ts-ignore
                    await this.context.setShowLoader(false);
                });
        }
    };

    render() {
        const {message} = this.state;

        return (
            <React.Fragment>
                <SafeAreaView
                    style={{
                        flex: 1,
                        backgroundColor: '#fff',
                    }}>
                    {
                        //@ts-ignore
                        this.context.showAlert && (
                            <Alert
                                //@ts-ignore
                                alertType={this.context.alertType}
                                //@ts-ignore
                                alertMessage={this.context.alertMessage}
                                //@ts-ignore
                                closeAlert={this.context.closeAlert}
                            />
                        )
                    }
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                        data-test="Auctions">
                        {
                            //@ts-ignore
                            this.context.showLoader ? (
                                <View
                                    style={styles.loaderContainer}
                                    data-test="loader">
                                    <Image
                                        style={{width: 100, height: 100}}
                                        source={loaderImage}
                                    />
                                </View>
                            ) : (
                                <React.Fragment>
                                    <View style={styles.relative}>
                                        <PageHeader
                                            boldText={lang.header['pl']}
                                            normalText={''}
                                            closeMethod={() => {
                                                this.props.navigation.goBack(
                                                    null,
                                                );
                                            }}
                                            closeMethodParameter={''}
                                        />

                                        <View
                                            style={
                                                styles.sellerVoteBoxContainer
                                            }>
                                            <TextAreaComponent
                                                placeholder={
                                                    lang.addMessage['pl']
                                                }
                                                inputOnChange={(
                                                    message: string,
                                                ) => this.setMessage(message)}
                                                value={message}
                                                maxLength={500}
                                                multiline={true}
                                                numberOfLines={10}
                                            />
                                        </View>
                                        <ButtonComponent
                                            pressButtonComponent={() =>
                                                this.sendNewConversationProduct(
                                                    message,
                                                )
                                            }
                                            buttonComponentText={
                                                lang.send['pl']
                                            }
                                            fullWidth={true}
                                            underlayColor="#dd904d"
                                            whiteBg={false}
                                            showBackIcon={false}
                                        />
                                    </View>

                                    <BottomPanel
                                        data-test="BottomPanel"
                                        navigation={this.props.navigation}
                                    />
                                </React.Fragment>
                            )
                        }
                    </View>
                </SafeAreaView>
            </React.Fragment>
        );
    }
}

ProductMessageBox.contextType = GlobalContext;
export default withNavigation(ProductMessageBox);

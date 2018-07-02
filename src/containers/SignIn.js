import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    KeyboardAvoidingView
} from 'react-native';

import { connect } from 'react-redux'

import { fonts } from '../theme'
import Input from '../components/Input'
import Button from '../components/Button'
import { loginUser } from "../reducers/auth";

class SignIn extends Component<{}> {

    constructor(props) {
        super(props);
    }

    state = {
        username: '',
        password: ''
    };

    onChangeText = (key, value) => {
        this.setState({
                [key]: value
            });
    };

    signIn () {
        const { password, username } = this.state;
        this.props.dispatchLogin( password, username, this.props.navigation.navigate);
    }

    render() {
        const { auth } = this.props;
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.heading}>
                    <Image
                        source={require('../assets/shape.png')}
                        style={styles.headingImage}
                        resizeMode="contain"
                    />
                </View>
                <Text style={[styles.greeting]}>
                    Welcome back,
                </Text>
                <Text style={[styles.greeting2]}>
                    sign in to continue
                </Text>
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="User Name"
                        type='username'
                        onChangeText={this.onChangeText}
                        value={this.state.username}
                    />
                    <Input
                        placeholder="Password"
                        type='password'
                        onChangeText={this.onChangeText}
                        value={this.state.password}
                        secureTextEntry
                    />
                </View>
                {
                    auth.loginError?
                        <Text style={{color:'red'}}>Error, wrong login or pass</Text>
                        :null
                }
                <Button
                    title='Sign In'
                    onPress={this.signIn.bind(this)}
                />
            </KeyboardAvoidingView>
        );
    }
}

const mapDispatchToProps = {
    dispatchLogin: (username, password, email,navigate) => loginUser(username, password, email, navigate)
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        flexDirection: 'row'
    },
    headingImage: {
        width: 38,
        height: 38
    },
    errorMessage: {
        fontSize: 12,
        marginTop: 10,
        color: 'transparent',
        fontFamily: fonts.base
    },
    inputContainer: {
        marginTop: 20
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 40
    },
    greeting: {
        marginTop: 20,
        fontSize: 24,
        fontFamily: fonts.light
    },
    greeting2: {
        color: '#666',
        fontSize: 24,
        marginTop: 5,
        fontFamily: fonts.light
    }
});
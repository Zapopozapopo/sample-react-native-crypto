import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    KeyboardAvoidingView
} from 'react-native';

import { fonts } from '../theme'
import { connect } from 'react-redux'

import Input from '../components/Input'
import Button from '../components/Button'
import {registerUser} from "../reducers/auth";
import { emailRegex } from "../utils/Regex";

const initialState = {
    username: '',
    password: '',
    email: ''
};

class SignUp extends Component<{}> {

    constructor(props) {
        super(props);
    }

    state = initialState;

    validateEmail = (email) => {
        return emailRegex.test(email);
    };

    validate =(username, password, email)=>{
        return {
          usernameError: username.length ===0,
          passwordError: password.length ===0,
          emailError: !this.validateEmail(email)
        };
    };

    onChangeText = (key, value) => {
        this.setState({
            [key]: value
        });
    };

    signUp() {
        const {username, password, email } = this.state;
        const errors = this.validate(username, password, email);
        if(!errors.passwordError && !errors.emailError && !errors.usernameError){
            this.props.dispatchCreateUser(username, password, email,this.props.navigation);
        }
    }

    render() {
        const { username, password, email } = this.state;
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
                <Text style={styles.greeting}>
                    Welcome,
                </Text>
                <Text style={styles.greeting2}>
                    sign up to continue
                </Text>
                <View style={styles.inputContainer}>
                    <Input
                        value={this.state.username}
                        placeholder="User Name"
                        type='username'
                        onChangeText={this.onChangeText}
                    />
                    {
                        username&&username.length===0?
                            <Text style={{color:'red'}}>Required</Text>
                            :null
                    }
                    <Input
                        value={this.state.email}
                        placeholder="Email"
                        type='email'
                        onChangeText={this.onChangeText}
                    />
                    {
                        email&& this.validateEmail(email)?
                            <Text style={{color:'red'}}>Email invalid</Text>
                            :null
                    }
                    <Input
                        value={this.state.password}
                        placeholder="Password"
                        secureTextEntry
                        type='password'
                        onChangeText={this.onChangeText}
                    />
                    {
                        password&&password.length===0?
                            <Text style={{color:'red'}}>Required</Text>
                            :null
                    }
                </View>
                {
                    auth.registerError?
                        <Text style={{color:'red'}}>Email or username already exist!</Text>
                        :null
                }
                <Button
                    title='Sign Up'
                    onPress={this.signUp.bind(this)}
                />
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispatchToProps = {
    dispatchCreateUser: (username, password, email,navigate) => registerUser(username, password, email,navigate)
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        fontFamily: fonts.light,
        fontSize: 24
    },
    greeting2: {
        fontFamily: fonts.light,
        color: '#666',
        fontSize: 24,
        marginTop: 5
    },
    heading: {
        flexDirection: 'row'
    },
    headingImage: {
        width: 38,
        height: 38
    },
    errorMessage: {
        fontFamily: fonts.base,
        fontSize: 12,
        marginTop: 10,
        color: 'transparent'
    }
});
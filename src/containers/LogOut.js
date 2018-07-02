import {Alert, View, TouchableOpacity, Text } from 'react-native'
import {connect} from "react-redux";
import {logOutUser} from '../reducers/auth'
import React, { Component } from 'react';

class LogOut extends Component {

    logOut =()=> {
        this.props.dispatchLogout(this.props.navigate);
    };
    handleOnPress =()=>{
        Alert.alert(
            'LogOut',
            'Are you sure want to logout?',
            [
                {text: 'Cancel', onPress: () =>{}, style: 'cancel'},
                {text: 'OK', onPress: () => this.logOut()},
            ],
            { cancelable: false }
        )
    };
    render(){
        return (
            <View>
                <TouchableOpacity onPress={() => this.handleOnPress()}>
                    <Text style={{color: 'white',padding: 10, marginLeft: 10, fontSize: 20}}>LogOut</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapDispatchToProps = {
    dispatchLogout: (navigate) => logOutUser(navigate)
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps,mapDispatchToProps)(LogOut)

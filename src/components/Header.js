import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const style = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        marginTop: 55,
        alignItems: 'center'
    },
    header: {
        fontWeight:'bold',
        fontSize: 20
    }
});

const Header =()=>{
    return (
        <View style={headerContainer}>
            <Text style={header}>Cryptocurrency!!!!! App</Text>
        </View>
    )
};

const {headerContainer, header} = style;

export default Header;
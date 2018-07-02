import React from 'react'
import {View, TouchableOpacity, Text } from 'react-native'


export default OpenDrawer = (props) => {
    return (
        <View style={{backgroundColor:'#666'}}>
            <TouchableOpacity onPress={() => props.navigate('DrawerOpen')}>
                <Text style={{color: 'white',padding: 10, marginLeft: 10, fontSize: 20}}>Tabs</Text>
            </TouchableOpacity>
        </View>
    )
};
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import FetchCoinDataDetails from '../reducers/coinDetailsReducer'
import {images} from '../utils/CoinIcons';
import Spinner from 'react-native-loading-spinner-overlay'

const styles = StyleSheet.create({
    container: {
        display: "flex",
        height: '100%',
        marginBottom: 20,
        borderBottomColor: "#e5e5e5",
        borderBottomWidth: 3,
        padding: 20
    },
    upperRow: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 15
    },
    coinSymbol: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 5,
        fontWeight: "bold",
    },
    coinName: {
        marginTop: 10,
        marginLeft: 5,
        marginRight: 20
    },
    seperator: {
        marginTop: 10,
    },
    coinPrice: {
        marginTop: 10,
        marginLeft: "auto",
        marginRight: 10,
        fontWeight: "bold",
    },
    image: {
        width: 35,
        height: 35,
    },
    moneySymbol: {
        fontWeight: "bold",
    },
    statisticsContainer: {
        display: "flex",
        borderTopColor: "#FAFAFA",
        borderTopWidth: 2,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    percentChangePlus: {
        color: "#00BFA5",
        fontWeight: "bold",
        marginLeft: 5
    },
    percentChangeMinus: {
        color: "#DD2C00",
        fontWeight: "bold",
        marginLeft: 5
    }
});

const {
    container,
    moneySymbol,
    upperRow,
    coinSymbol,
    coinName,
    coinPrice,
    statisticsContainer,
    seperator,
    percentChangePlus,
    percentChangeMinus
} = styles;

class Details extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        const {params} = this.props.navigation.state;
        const id = params ? params.current_coin_id : null;
        if (id) {
            this.props.FetchCoinDataDetails(id)
        }
    }

    render() {
        const {symbol, coin_name, price_usd, percent_change_24h, percent_change_7d} = this.props.details.data;
        const {details} = this.props;
        return (details.isFetching ?
                <View>
                    <Spinner
                        visible={true}
                        textContent="loading..."
                        textStyle={{color: '#253145'}}
                        animation='fade'
                    />
                </View> :
                <View style={container}>

                    <View style={upperRow}>
                        <Image
                            style={styles.image}
                            source={{uri: images[symbol]}}
                        />
                        <Text style={coinSymbol}>{symbol}</Text>
                        <Text style={seperator}>|</Text>
                        <Text style={coinName}>{coin_name}</Text>
                        <Text style={coinPrice}>{price_usd}
                            <Text style={moneySymbol}> $ </Text>
                        </Text>
                    </View>

                    <View style={statisticsContainer}>

                        <Text>24h:
                            <Text
                                style={percent_change_24h < 0 ? percentChangeMinus : percentChangePlus}> {percent_change_24h}
                                % </Text>
                        </Text>
                        <Text>7d:
                            <Text
                                style={percent_change_7d < 0 ? percentChangeMinus : percentChangePlus}> {percent_change_7d}
                                % </Text>
                        </Text>

                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        details: state.details
    }
}

export default connect(mapStateToProps, {FetchCoinDataDetails})(Details)
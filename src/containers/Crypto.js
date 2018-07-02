import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, ScrollView, Button} from 'react-native'
import FetchCoinData from '../reducers/cryptoReducer'
import CoinCard from '../components/CoinCard'
import Spinner from 'react-native-loading-spinner-overlay'

const styles = {
    contentContainer: {
        paddingBottom: 100,
    }
};

class CryptoContainer extends Component {

    componentWillMount() {

        this.props.FetchCoinData();
   }

    goToDetails = (id) => {
        this.props.navigation.navigate('details',
            {
                current_coin_id: id,
            }
        )
    };

    renderCoinCards() {
        const {crypto} = this.props;
        return crypto.isFetching ?
            <View>
                <Spinner
                    visible={true}
                    textContent="loading..."
                    textStyle={{color: '#253145'}}
                    animation='fade'
                />
            </View> :
            crypto.data.map((coin, index) =>
                <View key={index}>
                    <CoinCard
                        coin_name={coin.name}
                        symbol={coin.symbol}
                        price_usd={coin.price_usd}
                        percent_change_24h={coin.percent_change_24h}
                        percent_change_7d={coin.percent_change_7d}
                    />
                    <Button
                        title="Go to Details"
                        onPress={() => this.goToDetails(coin.id)}
                    />
                </View>
            )
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {this.renderCoinCards()}
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return {
        crypto: state.crypto
    }
}

export default connect(mapStateToProps, {FetchCoinData})(CryptoContainer)
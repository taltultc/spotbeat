/**
 * Created by adam on 6/23/16.
 */

import React from 'react'

import {
    StyleSheet,
    View,
    Image,

} from 'react-native'

export default class GifView extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Image source={{uri: this.props.gifUrl}}/>
            </View>
        );
    }
}

GifView.propTypes = {
    gifUrl: React.PropTypes.string
}

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
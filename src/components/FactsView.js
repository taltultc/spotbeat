/**
 * Created by adam on 6/23/16.
 */

import React from 'react'

import {
    StyleSheet,
    View,
    Image,
    Text,
} from 'react-native'

var imageSrc = require('.././assets/fun_fact.png')

var FactsView = React.createClass({

    getDefaultProps() {
        return {
            title: "Fun Fact! sdsdsds",
            body: "Some data about the fact",
        };
    },

    propTypes: {
        title: React.PropTypes.string,
        body : React.PropTypes.string,
    },

    render() {
        return (
            <View style={styles.container}>
                 <Text style={styles.title}> {this.props.title}</Text>
                <View style={styles.bodyContainer}>
                    <Image source={require('.././assets/fun_fact.png')} style={styles.image}/>
                    <Text style={styles.body}> {this.props.body} </Text>
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bodyContainer:{
        width: 250,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    title: {
        color: 'red',
        fontSize : 20,
        marginTop : 30,
        marginBottom : 30,
    },
    body :{
        flex:3
    },
    image :{
        flex:1,
        width : 50,
        height : 50,
    }
});

module.exports = FactsView;
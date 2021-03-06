/**
 * Created by idanr on 23/06/2016.
 */


import React from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    ScrollView,
    ListView,

} from 'react-native'


export default class LyricsView extends React.Component {
    constructor(props){
        super(props);

        this._ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
            if (typeof r1.status !== 'undefined') {
                return true;
            }
            return r1 !== r2;
        }})
        this.state = {
            currentTime : this.props.initialTime,
            currentIndex : 0,
            currentIndex : 0,
            dataSource: this._ds.cloneWithRows(
                this.props.lyricsArray
            )
        }
    }

    componentDidMount(){
        // Start timer
        setInterval(this.timerElapsed.bind(this), 1000);

    }

    timerElapsed() {

        var currentIndex = this.getCurrentIndex()


        var offsetToScrollTo = currentIndex * 50;
        this._listView.scrollTo({y:offsetToScrollTo})

        this.setState({
            currentTime: this.state.currentTime+ 1000,
            currentIndex : currentIndex,
            dataSource: this._ds.cloneWithRows(
                this.props.lyricsArray
            )
        })
    }

    getCurrentIndex(){
        currentIndex = this.props.lyricsArray.length - 1;
        for (var i = 0; i < this.props.lyricsArray.length; i += 1) {
            var line = this.props.lyricsArray[i];

            if (line.startTime >= this.state.currentTime){
                currentIndex = i;
                break;
            }
        }
        return currentIndex;
    }
    
    render(){
        return(
            <ListView style={styles.lyricsContainer}
                      ref={(listView) => { this._listView = listView;}}
                      dataSource={this.state.dataSource}
                      renderRow={this.renderRow.bind(this)}
                      enableEmptySections={true}
                      >
            </ListView>
        )
        
    }

     renderRow(rowData = {}, sectionID = null, rowID = null){
         var isSelectedRow = rowID == this.state.currentIndex
         var rowStyle = isSelectedRow ? styles.selectLine : styles.normalLine
         console.log("rowID = " + rowID);
         console.log("selectedIndex = " + this.getCurrentIndex());
         return (<Text style={[styles.row,rowStyle]}>{rowData.value}</Text>)
     }
};

LyricsView.propTypes= {
    lyricsArray : React.PropTypes.array,
    initialTime: React.PropTypes.number,
}

LyricsView.defaultProps ={
    lyricsArray : [],
    initialTime : 0,
}

var styles = StyleSheet.create({
    lyricsContainer:{
        height: 180,
        padding: 10,
        alignSelf:"flex-end"
    },

    selectLine:{
        fontFamily: 'HelveticaNeue-Light',
        color : 'green',
        fontSize: 20,
    },
    normalLine:{
        fontFamily: 'HelveticaNeue-Light',
        color : 'black',
        fontSize: 20,
    },
    row:{
        height : 50,
    },

    listView : {
        flex :1,
    }

})

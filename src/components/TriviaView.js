/**
 * Created by adam on 6/23/16.
 */

import React from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight

} from 'react-native'

export default class TriviaView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            secondsElapsed: 0,
            selectedIndex: -1,
        }
    }

    componentDidMount() {
        this.setState({
            secondsElapsed: 0
        });

        // Start timer
        setInterval(this.timerElapsed.bind(this), 1000);
    }

    timerElapsed() {
        let timeLeft = this.props.timerDuration - this.state.secondsElapsed;
        if (timeLeft === 0) {
            if (this.props.onTimeElapsed) {
                this.props.onTimeElapsed();
            }
            return;
        }

        this.setState({
            secondsElapsed: this.state.secondsElapsed + 1
        })
    }

    onAnswerClicked(index) {
        console.log("Clicked answer");
        console.log(index);

        this.setState({
            selectedIndex: index
        });

        setTimeout(() => {
            this.props.onAnswerClicked(index == this.props.correctAnswerIndex);
        }, 500);
    }

    renderAnswers() {
        var answerRows = [];
        var selectionStyles = {};
        if (this.state.selectedIndex > -1) {
            if (this.props.correctAnswerIndex === this.state.selectedIndex) {
                selectionStyles[this.state.selectedIndex] = styles.correctAnswerSelected;
            }
            else {
                selectionStyles[this.state.selectedIndex] = styles.wrongAnswerSelected;
                selectionStyles[this.props.correctAnswerIndex] = styles.correctAnswer
            }
        }

        this.props.answers.forEach((answer, index) => {

            var selectionStyle = {};
            if (selectionStyles[index]) {
                selectionStyle = selectionStyles[index]
            }

            let answerRow = (
                <TouchableHighlight
                    onPress={() => {
                        this.onAnswerClicked(index)
                    }}
                    key={index}
                    underlayColor="#eee"
                >
                    <Text style={[styles.answer, selectionStyle]} numberOfLines={2}>{index + 1} - {answer}</Text>
                </TouchableHighlight>
            );

            answerRows.push(answerRow);
        });

        return answerRows;
    }

    renderTimer() {
        if (this.props.timerDuration) {
            var timeLeft = this.props.timerDuration - this.state.secondsElapsed;
            if (timeLeft < 0) {
                timeLeft = 0;
            }
            return (
                <View style={styles.timerContainer}>
                    <Text style={styles.timer}>{timeLeft}</Text>
                </View>
            );
        }

        return null;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.question}>{this.props.question}</Text>
                <View style={styles.answersContainer}>
                    {this.renderAnswers()}
                </View>
                {this.renderTimer()}
            </View>
        );
    }
}

TriviaView.propTypes = {
    question: React.PropTypes.string.isRequired,
    answers: React.PropTypes.array.isRequired,
    correctAnswerIndex: React.PropTypes.number.isRequired,
    onAnswerClicked: React.PropTypes.func,
    timerDuration: React.PropTypes.number,
    onTimeElapsed: React.PropTypes.func,
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: 250,
        borderColor: "#ccc",
        borderWidth: 1,
    },
    question: {
        lineHeight: 30,
        fontFamily: 'HelveticaNeue-Bold',
        fontSize: 17,
        paddingLeft: 10,
    },
    answersContainer: {
        height: 160,
        paddingLeft: 10,
        flex: 1,
    },
    answer: {
        height: 40,
        lineHeight: 30,
        fontFamily: 'HelveticaNeue-Light',
        fontSize: 16,
    },
    correctAnswerSelected: {
        backgroundColor: 'green',
    },
    wrongAnswerSelected: {
        backgroundColor: 'red',
    },
    correctAnswer: {
      backgroundColor: '#eee',
    },
    timerContainer: {
        borderTopColor: "#ccc",
        borderTopWidth: 1,
    },
    timer: {
        height: 40,
        lineHeight: 30,
        fontFamily: 'HelveticaNeue-Light',
        fontSize: 16,
        textAlign: 'center',
    }
});
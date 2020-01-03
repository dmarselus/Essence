import React, { Component } from 'react';
import { Dimensions, View, Text, TouchableOpacity, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
// import Theme from 'react-native-theming';

const { width, height } = Dimensions.get('window');

export default class MovieCard extends Component {
    // * * * * * * * * * * *
    // * Props
    // * * * * * * * * * * *
    // onCardPress
    // header
    // subHeader
    //renderRightButton

    // const renderSkeletonCard = () => {
    //     return (
    //         <TouchableOpacity style={styles.teamView} onPress={this.props.onCardPress ? this.props.onCardPress : null}>
    //             <View>
    //                 <Theme.Text style={[styles.teamName, { color: '@headerTextColor' }]}>{this.props.header}</Theme.Text>
    //                 <Theme.Text style={[styles.teamPlayer, { color: '@headerTextColor' }]}>{this.props.subHeader}</Theme.Text>
    //             </View>
    //             <View style={{ position: 'absolute', right: 0, borderTopRightRadius: 15, borderBottomRightRadius: 15, height: height / 10, justifyContent: 'center', alignContent: 'center' }}>
    //                 {this.props.renderRightButton}
    //             </View>
    //         </TouchableOpacity>
    //     )
    // }

    render() {
        return (
            <View style={styles.cardContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Image
                        style={{ width: width / 3, height: width / 3 * 1.5 }}
                        source={{ uri: this.props.poster }}
                        resizeMethod={'resize'}
                    />
                    <View>
                        <Text>
                            {this.props.title}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }


}

const styles = EStyleSheet.create({
    cardContainer: {
        // height: height / 5,
        width: width / 1.3,
        alignSelf: 'center',
        borderRadius: 20,
        padding: '5%',
        margin: '5%',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 1,
        backgroundColor: 'red'

    },
    teamView: {
        paddingHorizontal: '1rem',
        justifyContent: 'center',
        height: '100%',
    },
    teamName: {
        fontSize: '1.1rem',
        marginTop: -height * 0.013
    },
    teamPlayer: {
        fontSize: '.9rem',
        marginTop: height * 0.01
    },
})

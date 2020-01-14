import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import {
	Ionicons,
	MaterialIcons,
	MaterialCommunityIcons,
	FontAwesome,
	Feather,
	Octicons,
	Entypo,
	SimpleLineIcons,
	AntDesign,
	EvilIcons
} from '@expo/vector-icons';


const { width, height } = Dimensions.get('window');
const imgHeader = 'https://image.tmdb.org/t/p/w500';

// /arrow-right-bold-circle
export default class PersonCard extends Component {
	// * * * * * * * * * * *
	// * Props
	// * * * * * * * * * * *
	// onCardPress
	// header
	// subHeader
	//renderRightButton

	render() {
		const showYear = (text) => {
			let year = text.split('-');
			return year[0];
		};

		return (
			<TouchableOpacity onPress={this.props.onPress} style={styles.card}>

				{this.props.profile_path ?
					<Image
						source={{
							uri: `${imgHeader}${this.props.profile_path}`,
							width: width / 3,
							height: width / 2.5,
							scale: 2
						}}
						resizeMode={'cover'} /> :
					<View style={{
						justifyContent: 'center',
						height: width / 2.5,
					}}>
						<MaterialCommunityIcons name="emoticon-dead-outline" size={width / 3} color={'#9DAAC7'} />
					</View>

				}
				<View style={{ justifyContent: 'space-around', height: '25%', backgroundColor: 'blue' }}>
					<Text style={{ fontSize: styles.$remValue, color: 'white' }}>{this.props.realName}</Text>
					<Text style={{ fontSize: styles.$remValue, color: 'white' }}>{this.props.characterName}</Text>
				</View>
				{/* </LinearGradient> */}
			</TouchableOpacity>
		);
	}
}

const styles = EStyleSheet.create({
	$remValue: '1rem',
	card: {
		marginHorizontal: '1rem',
		width: width / 3,


	}
});

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
// import { mdiEmoticonDead } from '@mdi/js';
// import Theme from 'react-native-theming';

const { width, height } = Dimensions.get('window');
const imgHeader = 'https://image.tmdb.org/t/p/w500';

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
				{/* <LinearGradient
					start={{ x: 1, y: 0 }}
					end={{ x: 1, y: 1 }}
					colors={[ 'transparent', 'black' ]}
					// style={{ borderRadius:height/2}}
				> */}
				<Image
					style={[
						{
							// alignItems: 'center',
							// justifyContent: 'flex-end'
							// height: '60%'
							// opacity: 0.75,
							//
							resizeMode: 'stretch'
							// resizeMethod: 'resize'
						}
					]}
					source={{
						uri: `${imgHeader}${this.props.profile_path}`,
						width: width / 3,
						height: width / 2.5,
						scale: 2
					}}
					// imageStyle={{ resizeMode: 'cover' }}
				/>
				<View style={{ justifyContent: 'space-around', height: '25%', backgroundColor: 'blue' }}>
					<Text style={{ fontSize: styles.$remValue, color: 'white' }}>some Desciption</Text>
					<Text style={{ fontSize: styles.$remValue, color: 'white' }}>some Desciption</Text>
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
		height: width / 1.75,
		backgroundColor: 'red'
	}
});

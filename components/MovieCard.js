import React, { Component } from 'react';
import { Dimensions, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
// import Theme from 'react-native-theming';

const { width, height } = Dimensions.get('window');
const imgHeader = 'https://image.tmdb.org/t/p/w500';

export default class MovieCard extends Component {
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
			<TouchableOpacity onPress={() => console.log(this.props.id)} style={{ marginVertical: '5%' }}>
				<View style={styles.cardContainer}>
					<View style={{ height: '20%', justifyContent: 'center' }}>
						<Text style={{ fontSize: styles.$remValue * 1, textAlign: 'center', color: 'white' }}>
							{this.props.title}
							{`\n(${showYear(this.props.release_date)})`}
						</Text>
					</View>
					<View style={{ height: '80%', justifyContent: 'center', alignItems: 'center' }}>
						<Image
							style={{ width: width / 2.75, height: width / 2.75 * 1.5 }}
							source={{ uri: `${imgHeader}${this.props.poster_path}` }}
							resizeMethod={'resize'}
						/>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = EStyleSheet.create({
	$remValue: '1rem',
	cardContainer: {
		height: height / 2.7,
		width: width / 2.3
	}
});

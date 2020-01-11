import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Carousel from 'react-native-snap-carousel';
import PersonCard from '../components/PersonCard';
import {
	axiosGetNowPlaying,
	axiosGetMoviesByTitle,
	axiosGetMovieDetailsById,
	axiosGetMovieCastsById
} from '../API/axiosMovies';
import MovieCard from '../components/MovieCard';

const { width, height } = Dimensions.get('window');
const SEARCH = <Ionicons name="md-search" size={height / 25} color={'#9DAAC7'} />;
const imgHeader = 'https://image.tmdb.org/t/p/w500';
export class MovieDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movie: null,
			casts: null,
			query: '',
			movies: []
		};
	}

	getNowPlaying = async () => {
		let movies = await axiosGetNowPlaying();
		this.setState({ movies });
	};

	componentDidMount = async () => {
		let id = this.props.navigation.getParam('paramOne');
		console.log(id);

		let movie = await axiosGetMovieDetailsById(id);
		let casts = await axiosGetMovieCastsById(id);
		console.log(casts.length);

		this.setState({ movie, casts }, () => console.log(this.state.casts.length));
	};
	render() {
		const renderHeader = () => {
			return (
				<View style={styles.header}>
					{/* <Text>back</Text> */}
					<Image style={{ width: width / 4, height: width / 4 }} source={require('../assets/logo.png')} />
					{/* <Text>something</Text> */}
				</View>
			);
		};
		const renderBody = () => {
			const axiosCall = async (text) => {
				let res = await axiosGetMoviesByTitle(text);
				if (res) this.setState({ movies: res });
			};
			const renderTop = () => {
				return (
					<View style={{ justifyContent: 'space-around', height: '60%' }}>
						<View style={{ flexDirection: 'row', width: width, justifyContent: 'space-around' }}>
							<Image
								style={{ width: width / 2.25, height: width / 2.25 * 1.5 }}
								source={{ uri: `${imgHeader}${this.state.movie && this.state.movie.poster_path}` }}
								resizeMethod={'resize'}
							/>
							<Text style={{ fontSize: styles.$remValue, color: 'white' }}>some Desciption</Text>
						</View>

						<Text style={{ fontSize: styles.$remValue, color: 'white' }}>
							{this.state.movie && this.state.movie.overview}
						</Text>
					</View>
				);
			};
			const renderCarousel = (array) => {
				const handlePress = (clickedIndex, currentIndex) => {
					if (clickedIndex === currentIndex) console.log('next page');
					else this.refs.carousel.snapToItem(clickedIndex, true);
				};
				return (
					<Carousel
						ref={'carousel'}
						// contentContainerCustomStyle={{}}
						// layout={'tinder'}
						// layoutCardOffset={`1`}
						// hasParallaxImages
						// layoutCardOffset={19}
						style={{ height: '30%', backgroundColor: 'yellow' }}
						inactiveSlideOpacity={0.5}
						lockScrollWhileSnapping={true}
						enableMomentum
						data={array}
						renderItem={({ item, index }) => {
							return (
								<PersonCard
									profile_path={item.profile_path}
									characterName={item.character}
									realName={item.name}
									personId={item.credit_id}
									onPress={() => handlePress(index, this.refs.carousel.currentIndex)}
								/>
							);
						}}
						sliderWidth={width}
						itemWidth={width / 2.5}
						// itemHeight={height / 4}
					/>
				);
			};
			return (
				<View
					style={{
						alignItems: 'flex-start',
						justifyContent: 'space-around',
						width: width,
						height: height
					}}
				>
					{renderTop()}
					{renderCarousel(this.state.casts)}
				</View>
			);
		};
		return (
			<LinearGradient
				start={{ x: 1, y: 0 }}
				end={{ x: 1, y: 1 }}
				colors={[ '#353b4d', '#212530' ]}
				style={{ flex: 1 }}
			>
				{renderHeader()}
				{renderBody()}
			</LinearGradient>
		);
	}
}
const styles = EStyleSheet.create({
	$remValue: '1rem',
	header: {
		height: width / 4,
		alignItems: 'center',
		justifyContent: 'space-evenly',
		flexDirection: 'row',
		paddingTop: '10%'
	},
	paginationStyle: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		// position: "absolute",
		// top:'-5%',
		width: width,
		// height: "5%",
		alignItems: 'center'
	},
	selectedPage: {
		fontSize: '1.5rem'
	},
	unselecetedPage: {
		fontSize: '1rem'
	},
	searchBar: {
		borderRadius: width / 2,
		width: '70%',
		backgroundColor: 'white',
		marginBottom: '5%'
	}
});
export default MovieDetails;

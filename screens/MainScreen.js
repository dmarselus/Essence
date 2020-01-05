import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Swiper from 'react-native-swiper';
import { axiosGetNowPlaying, axiosGetMoviesByTitle } from '../API/axiosMovies';
import MovieCard from '../components/MovieCard';

const { width, height } = Dimensions.get('window');
const SEARCH = <Ionicons name="md-search" size={height / 25} color={'#9DAAC7'} />;

export class MainScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: '',
			movies: []
		};
	}

	getNowPlaying = async () => {
		let movies = await axiosGetNowPlaying();
		this.setState({ movies });
	};

	componentDidMount = async () => {
		this.getNowPlaying();
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

			const renderSwiper = () => {
				const renderPagination = (index, total, context) => {
					const title = [ 'Movies', 'Games' ];
					const renderButton = (value, myIndex) => {
						const swipe = (myIndex) => this.swiper.scrollBy(index - myIndex, true);
						return (
							<TouchableOpacity key={myIndex} onPress={(myIndex) => swipe(myIndex)}>
								<Text
									style={[
										index === myIndex ? styles.selectedPage : styles.unselecetedPage,
										{ color: 'white', textAlignVertical: 'center' }
									]}
								>
									{value}
								</Text>
							</TouchableOpacity>
						);
					};
					return (
						<View style={styles.paginationStyle}>
							{title.map((value, index) => renderButton(value, index))}
						</View>
					);
				};
				const renderTab1 = () => {
					return (
						<ScrollView
							contentContainerStyle={{
								alignItems: 'center',
								justifyContent: 'space-evenly',
								flexWrap: 'wrap',
								flexDirection: 'row'
							}}
						>
							{this.state.movies.map(({ poster_path, title, release_date, id }) => (
								<MovieCard
									poster_path={poster_path}
									title={title}
									release_date={release_date}
									key={id}
									id={id}
								/>
							))}
						</ScrollView>
					);
				};
				return (
					<Swiper
						style={{}}
						renderPagination={renderPagination}
						ref={(swiperRef) => (this.swiper = swiperRef)}
						loop={false}
					>
						{renderTab1()}
						<Text>basdasdasd</Text>
					</Swiper>
				);
			};
			const renderTextInput = (text) => {
				const handleInput = async (text) => {
					if (!text) this.getNowPlaying();
					this.setState(
						{ query: text },
						() => this.state.query && this.state.query.length > 1 && axiosCall(this.state.query)
					);
				};
				return (
					<View style={styles.searchBar}>
						<TextInput
							style={{
								paddingLeft: '4%',
								height: height / 20,
								fontSize: styles.$remValue
							}}
							placeholder={'Search'}
							value={this.state.query}
							onChangeText={(text) => handleInput(text)}
						/>
					</View>
				);
			};

			return (
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'space-around'
					}}
				>
					{renderTextInput()}
					{renderSwiper()}
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
export default MainScreen;

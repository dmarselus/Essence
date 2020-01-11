import axios from 'axios';

const url = 'https://api.themoviedb.org/3/';
const headers = { 'Content-Type': 'application/json' };
const key = 'db272b37e8c048e380ff845c309d3164';
let res;
const axiosGetNowPlaying = async () => {
	try {
		let res = await axios.get(`${url}movie/now_playing?api_key=${key}`);
		return res.data.results;
	} catch (err) {
		console.log('axiosGetNowPlaying ' + err.message);
	}
};
const axiosGetMoviesByTitle = async (title) => {
	try {
		let res = await axios.get(
			`${url}search/movie?api_key=${key}&language=en-US&query=${title}&page=1&include_adult=false`,
			headers
		);
		if (res.data.results.length > 0) return res.data.results;
		else return false;
	} catch (err) {
		console.log('axiosGetNowPlaying ' + res.status_message);
	}
};
const axiosGetMovieDetailsById = async (id) => {
	try {
		let res = await axios.get(`${url}movie/${id}?api_key=${key}`);
		return res.data;
	} catch (err) {
		console.log('axiosGetMovieDetailsById ' + res.status_message);
	}
};

const axiosGetMovieCastsById = async (id) => {
	try {
		let res = await axios.get(`${url}movie/${id}/credits?api_key=${key}`);
		if (res.data.cast) return res.data.cast;
		else return false;
	} catch (err) {
		console.log('axiosGetMovieCastsById ');
	}
};

export { axiosGetNowPlaying, axiosGetMoviesByTitle, axiosGetMovieDetailsById, axiosGetMovieCastsById };

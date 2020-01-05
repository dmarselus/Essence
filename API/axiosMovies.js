import axios from 'axios';

const url = 'https://api.themoviedb.org/3/';
const headers = { 'Content-Type': 'application/json' };
const key = 'db272b37e8c048e380ff845c309d3164';
const axiosGetNowPlaying = async () => {
	try {
		let res = await axios.get(`${url}movie/now_playing?api_key=${key}`);
		return res.data.results;
	} catch (err) {
		console.log('axiosGetNowPlaying ' + err.message);
	}
};
const axiosGetMoviesByTitle = async (title) => {
	let res;
	try {
		res = await axios.get(
			`${url}search/movie?api_key=${key}&language=en-US&query=${title}&page=1&include_adult=false`,
			headers
		);
		if (res.data.results.length > 0) return res.data.results;
		else return false;
	} catch (err) {
		console.log('axiosGetNowPlaying ' + res.status_message);
	}
};

export { axiosGetNowPlaying, axiosGetMoviesByTitle };

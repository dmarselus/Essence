import { createAppContainer, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './screens/MainScreen';
import MovieDetails from './screens/MovieDetails';
import EStyleSheet from 'react-native-extended-stylesheet';

const MainNavigator = createStackNavigator(
	{
		MainScreen: { screen: MainScreen },
		MovieDetails: { screen: MovieDetails }
	},
	{ headerMode: 'none' }
);

const App = createAppContainer(MainNavigator);
EStyleSheet.build({
	// always call EStyleSheet.build() even if you don't use global variables!
	$textColor: '#0275d8'
});
export default App;

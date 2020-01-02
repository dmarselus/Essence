import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainScreen from './screens/MainScreen';
import EStyleSheet from 'react-native-extended-stylesheet';

const MainNavigator = createStackNavigator(
  {
    Home: MainScreen
  },
  {headerMode:'none'});

const App = createAppContainer(MainNavigator);
EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!
  $textColor: '#0275d8'
});
export default App;
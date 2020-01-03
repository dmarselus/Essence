import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Swiper from "react-native-swiper";
import axios from 'axios'
import { getOrientationAsync } from "expo/build/ScreenOrientation/ScreenOrientation";
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome, Feather, Octicons, Entypo, SimpleLineIcons, AntDesign, EvilIcons } from '@expo/vector-icons';
import MovieCard from '../components/MovieCard'



const { width, height } = Dimensions.get("window");
const SEARCH = (<Ionicons name="md-search" size={height / 25} color={'#9DAAC7'} />);

export class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      movies: []
    };
  }
  render() {
    const renderHeader = () => {
      return (
        <View style={styles.header}>
          {/* <Text>back</Text> */}
          <Image
            style={{ width: width / 4, height: width / 4 }}
            source={require("../assets/logo.png")}
          />
          {/* <Text>something</Text> */}
        </View>
      );
    };
    const renderBody = () => {
      const renderSwiper = () => {

        const axiosCall = (text) => {
          console.log('axioscall');
          axios({
            "method": "GET",
            "url": "https://movie-database-imdb-alternative.p.rapidapi.com/",
            "headers": {
              "content-type": "application/octet-stream",
              "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
              "x-rapidapi-key": "0916a7a044msh08cdca734606168p1a7422jsna4a679792623"
            }, "params": {
              "page": "1",
              "r": "json",
              "s": text
            }
          })
            .then((response) => {
              console.log(response.data)
              if ('Search' in response.data) this.setState({ movies: response.data.Search })
            })
            .catch((error) => {
              console.log('errror ', error)
            })
        }

        const renderPagination = (index, total, context) => {
          const title = ["Movies", "Games"];
          const renderButton = (value, myIndex) => {
            const swipe = myIndex =>
              this.swiper.scrollBy(index - myIndex, true);
            return (
              <TouchableOpacity
                key={myIndex}
                onPress={myIndex => swipe(myIndex)}
              >
                <Text
                  style={[
                    index === myIndex
                      ? styles.selectedPage
                      : styles.unselecetedPage,
                    { color: "white", textAlignVertical: "center" }
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
            <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-evenly' }}>

              <TouchableOpacity onPress={() => axiosCall(this.state.searchValue)}><Text>{SEARCH}</Text></TouchableOpacity>
              {this.state.movies.map(({ Poster, Title, Year }) => <MovieCard poster={Poster} title={Title} />)}
            </ScrollView>
          )

        }
        return (
          <Swiper
            style={{}}
            renderPagination={renderPagination}
            ref={swiperRef => (this.swiper = swiperRef)}
            loop={false}
          >

            {renderTab1()}
            <Text>basdasdasd</Text>
          </Swiper>
        );
      };
      const renderTextInput = () => {
        return (
          <View style={styles.searchBar}>
            <TextInput
              style={{
                paddingLeft: "4%",
                height: height / 20,
                fontSize: styles.$remValue
              }}
              placeholder={"Search"}
              value={this.state.searchValue}
              onChangeText={text => this.setState({ searchValue: text })}
            ></TextInput>
          </View>
        );
      };

      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-around"
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
        colors={["#353b4d", "#212530"]}
        style={{ flex: 1 }}
      >
        {renderHeader()}
        {renderBody()}
      </LinearGradient>
    );
  }
}
const styles = EStyleSheet.create({
  $remValue: "1rem",
  header: {
    height: width / 4,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    paddingTop: "10%",
    // backgroundColor: "green"
  },
  paginationStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    // position: "absolute",
    // top:'-5%',
    width: width,
    // height: "5%",
    alignItems: "center"
  },
  selectedPage: {
    fontSize: "1.5rem"
  },
  unselecetedPage: {
    fontSize: "1rem"
  },
  searchBar: {
    borderRadius: width / 2,
    width: "70%",
    backgroundColor: "white",
    marginBottom: "5%"
  }
});
export default MainScreen;

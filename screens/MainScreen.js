import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Swiper from "react-native-swiper";
import { getOrientationAsync } from "expo/build/ScreenOrientation/ScreenOrientation";

const { width, height } = Dimensions.get("window");
export class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        return (
          <Swiper
            style={{}}
            renderPagination={renderPagination}
            ref={swiperRef => (this.swiper = swiperRef)}
            loop={false}
          >
            <Text>a</Text>
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
    backgroundColor: "green"
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

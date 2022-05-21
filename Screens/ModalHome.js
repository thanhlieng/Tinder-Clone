import {
  View,
  Text,
  Button,
  SafeAreaView,
  useWindowDimensions,
  Image,
  Pressable,
  StyleSheet,
  StatusBar,
  PixelRatio,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Carousel, { Pagination } from "react-native-snap-carousel";
import React, { useState, useRef, useEffect, useCallback } from "react";
import tw from "tailwind-react-native-classnames";
import { ScrollView } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function ModalHome({ route, navigation }) {
  const { active, data } = route.params;
  const { height, width, fontScale } = useWindowDimensions();

  const Carouselref = useRef(null);
  const [dotindex, setdotIndex] = useState(active);
  const fullYear = new Date();
  const renderImage = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          justifyContent: "center",
          backgroundColor: "transparent",
          height: height * 0.65,
        }}
      >
        <Image
          source={{ uri: "" + item }}
          style={[tw`h-full w-full`, { borderRadius: 10 }]}
          resizeMode="stretch"
        ></Image>

        <Pressable
          style={[tw`absolute right-0 top-0`, { width: "30%", height: "80%" }]}
          onPress={() => Carouselref.current.snapToNext()}
        />
        <Pressable
          style={[tw`absolute top-0`, { width: "30%", height: "80%" }]}
          onPress={() => Carouselref.current.snapToPrev()}
        />
      </View>
    );
  };

  return (
    <ScrollView style={[styles.container]}>
      <View>
        <Carousel
          layout="tinder"
          ref={Carouselref}
          data={data.image}
          sliderWidth={width}
          itemWidth={width}
          renderItem={renderImage}
          inactiveSlideShift={0}
          useScrollView={false}
          scrollEnabled={true}
          onSnapToItem={(index) => setdotIndex(index)}
        />
        <Pagination
          containerStyle={{
            position: "absolute",
            backgroundColor: "transparent",
            right: 0,
            top: 0,
          }}
          renderDots={(activeIndex) => (
            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.7)",
                alignItems: "center",
                padding: 5,
                borderRadius: 99999,
                paddingLeft: 8,
                paddingRight: 8,
              }}
            >
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 15 }}
              >
                {activeIndex + 1}/{data.image.length}
              </Text>
            </View>
          )}
          activeDotIndex={dotindex}
          dotsLength={5}
        />
        <Pressable
          style={{
            position: "absolute",
            bottom: PixelRatio.getPixelSizeForLayoutSize(-12),
            right: 50,

            borderRadius: 999,
            justifyContent: "center",
            alignItems: "center",
            height: PixelRatio.getPixelSizeForLayoutSize(24),
            width: PixelRatio.getPixelSizeForLayoutSize(24),
          }}
          onPress={() => Carouselref.current.snapToItem(dotindex)}
        >
          <LinearGradient
            colors={["#FFADB0", "#FF84A6", "#FF599C"]}
            style={{
              alignItems: "center",
              borderRadius: 10000,
              height: PixelRatio.getPixelSizeForLayoutSize(24),
              width: PixelRatio.getPixelSizeForLayoutSize(24),
            }}
          >
            <FontAwesome
              name="arrow-down"
              color={"white"}
              size={PixelRatio.getPixelSizeForLayoutSize(20)}
              style={{ padding: 4 }}
            />
          </LinearGradient>
        </Pressable>
      </View>
      <View
        style={{
          marginHorizontal: "5%",
          marginTop: "5%",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 30 / PixelRatio.getFontScale(),
          }}
        >
          {data.userName}, {fullYear.getFullYear() - data.birthYear}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <FontAwesome
            name="intersex"
            color={"rgba(0,0,0,0.8)"}
            size={PixelRatio.getPixelSizeForLayoutSize(10)}
          />
          <Text
            style={{
              fontSize: 18 / PixelRatio.getFontScale(),
              marginLeft: 5,
            }}
          >
            {data.sex ? "Nam" : "Nữ"}
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            width: "100%",
            borderBottomColor: "rgba(0,0,0,0.2)",
            borderBottomWidth: 2,
          }}
        ></View>
        <Text
          style={{
            marginTop: 10,
            fontWeight: "bold",
            fontSize: 16 / PixelRatio.getFontScale(),
          }}
        >
          Mô tả bản thân:
        </Text>
        <Text>{data.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export default ModalHome;

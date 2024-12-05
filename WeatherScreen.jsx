import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableHighlight, FlatList, ScrollView } from "react-native";
import axios from "axios";
import Icon from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from "react-native-linear-gradient";
import BlueShinyBackground from "./BlueShinyBG";
import List from "./navigations/List";
import SplashScreen from "react-native-splash-screen";

const WeatherApp = ({ navigation }) => {
  useEffect(() => {
    SplashScreen.hide();
    console.log('splash is runniing')
  }, [1000])

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "7c66ebe9e63e498b890160659242111";
  const BASE_URL = "https://api.weatherapi.com/v1";

  const condition = weather?.current?.condition.text || "";
  const humidity = weather?.current.humidity;
  const wind = weather?.current.wind_kph;
  const citi = weather?.location?.name;
  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    try {
      const response = await axios.get(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${city}`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Could not fetch weather. Please try again.");
    }
  };
  const renderItem = ({ item }) => (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'darkgray', borderRadius: 9, paddingHorizontal: 20, paddingVertical: 10, marginVertical: 10, marginHorizontal: 10 }}
        key={item.id}>
        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}>{item.day}</Text>
        <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}>{item.date}</Text>
      </View>
    </View>
  )

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.gradientBackground} />
      <View style={styles.dotContainer}>
        {Array.from({ length: 50 }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                top: Math.random() * 100 + "%", // Random vertical position
                left: Math.random() * 100 + "%", // Random horizontal position
              },
            ]}
          />
        ))}
      </View>

      <FlatList
        data={daydata}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        // contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 15, }}
        ListHeaderComponent={
          <View style={styles.container}>


            <Text style={styles.title}>Weather App</Text>
            <View style={{ flexDirection: 'row', marginBottom: 10, marginHorizontal: 14 }}>
              <TextInput
                style={styles.input}
                placeholder="Enter city name"
                value={city}
                onChangeText={(text) => setCity(text)}
              />
              <TouchableHighlight
                activeOpacity={0.8}
                style={styles.highlightButton}
                onPress={fetchWeather}
                underlayColor="#0056b3"
              >
                <View style={styles.iconContainer}>
                  <Icon name="search" size={24} color="#fff" />
                  <Text style={{ fontSize: 16, fontWeight: '700', color: '#fff', marginLeft: 5 }}>Search</Text>
                </View>
              </TouchableHighlight>
            </View>
            {error ? (
              <Text style={styles.error}>{error}</Text>
            ) : weather ? (
              <View style={styles.weatherInfo}>
                <TouchableHighlight
                  onPress={() => navigation.navigate("List", { citi, condition, wind, humidity })}
                  style={styles.cityIcon}
                  underlayColor="#0056b3"
                >
                  <Text style={[styles.weatherText, { marginTop: -20, color: '#000', margin: 30, fontWeight: 'bold', }]}>
                    {citi} {' '}
                    <Icon name="location-city" size={29} />
                  </Text>
                </TouchableHighlight>
                <View style={{ flexDirection: 'row', marginBottom: 60 }}>
                  <Text style={[styles.weatherText, {
                    fontSize: 100,
                    fontWeight: 'bold', color: '#000'
                    // marginTop: 50, 
                  }]}>

                    {weather.current.temp_c}
                  </Text>
                  <Text style={{ fontSize: 14, marginTop: 30, fontWeight: 'bold', color: '#000' }}>o</Text>
                  <Text style={{ fontSize: 28, marginTop: 28, fontWeight: 'bold', color: '#000' }}>C</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.weatherText, { fontSize: 14, fontWeight: '800' }]}>
                    Condition: {condition} {'        '}
                  </Text>
                  <Text style={[styles.weatherText, { fontSize: 14, fontWeight: '800' }]}>
                    Humidity: {humidity}% {'       '}
                  </Text>
                  <Text style={[styles.weatherText, { fontSize: 14, fontWeight: '800' }]}>
                    Wind: {wind} kph
                  </Text>
                </View>
              </View>


            ) : null}
          </View>
        }

      />

    </View>
  );
};

const daydata = [
  { id: 1, day: "Today", date: "21/11" },
  { id: 2, day: "Tommorrow", date: "22/11" },
  { id: 3, day: "Saturday", date: "23/11" },
  { id: 4, day: "Sunday", date: "24/11" },
  { id: 5, day: "Monday", date: "25/11" },
  { id: 6, day: "Tuesday", date: "26/11" },
  { id: 7, day: "Wednesday", date: "27/11" },
  { id: 8, day: "Thursday", date: "28/11" },
]

const styles = StyleSheet.create({
  container: {

    flexGrow: 1,
    position: 'relative',
    // justifyContent: "center",
    alignItems: "center",
    // padding: 20,
    // backgroundColor: "#f5f5f5",
    // backgroundColor:


  },
  gradientBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "blue",
    // Simulated gradient
    // backgroundImage: "linear-gradient(180deg, #4facfe 0%, #007BFF 100%)",
  },
  dotContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  dot: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "white",
    opacity: 0.3,
  },
  iconContainer: {
    flexDirection: "row",
    // marginTop: -4,
    // height:20,
    alignItems: "center",
  },
  highlightButton: {
    backgroundColor: "#007BFF",
    padding: 16,
    // height: '82%',
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    // borderTopLeftRadius: 0, borderBottomLeftRadius: 0,
    // flexDirection: "row",
    // alignItems: "center",
  },
  cityIcon: {
    padding: 10,
    justifyContent: 'center',
    // alignContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20, color: '#000', marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    width: "70%",
    // height:40,
    fontSize: 18,
    color: '#fff',
    marginRight: 5,
    // backgroundColor:'blue'
  },
  weatherInfo: {
    marginTop: 20,
    alignItems: "center",
  },
  weatherText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fdfd'
    // marginBottom: 5,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default WeatherApp;

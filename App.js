import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator,
  StatusBar
} from 'react-native';


import { fetchLocationId, fetchWeather } from './utils/api';
import getImageForWeather from './utils/getImageForWeather';
import SearchInput from './components/SearchInput';

export default function App() {

  const initAppState = {
    loading: false,
    error: false,
    location: '',
    temperature: 0,
    weather: 0
  };

  const [appState, setAppState] = useState(initAppState);

  useEffect(() => {
    handleUpdateLocation('Lagos');
  }, [handleUpdateLocation]);

  const handleUpdateLocation = (city) => {
    if (!city) return;

    setAppState({ ...appState, loading: true });

    try {
      (async () => {
        const locationId = await fetchLocationId(city);

        //if no location id found. 
        if (!locationId) {
          setAppState({ ...appState, loading: false, error: true });
          return;
        }

        const { location, weather, temperature } = await fetchWeather(locationId);

        setAppState({ ...appState, loading: false, error: false, location, weather, temperature });
      })();
    }
    catch (error) {
      setAppState({ ...appState, loading: false, error: true });
    }
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={getImageForWeather(appState.weather)} style={styles.imageContainer}
        imageStyle={styles.image}>

        <View style={styles.detailsContainer}>
          <ActivityIndicator animating={appState.loading} color="white" size="large" />


          {!appState.loading && appState.error && (
            <View>
              <Text style={[styles.largeText, styles.textStyle]}>
                Uh-oh! Could not find the Weather.
              </Text>
              <Text style={[styles.smallText, styles.textStyle]}>
                You could try searching the weather for a different city.
                </Text>
            </View>
          )}


          {!appState.error && (
            <View>
              <Text style={[styles.largeText, styles.textStyle]}>
                {appState.location}
              </Text>
              <Text style={[styles.smallText, styles.textStyle]}>
                {appState.weather}
              </Text>
              <Text style={[styles.largeText, styles.textStyle]}>
                {`${Math.round(appState.temperature)}°`}
              </Text>
            </View>
          )}

          <SearchInput placeholder="Search any city" onSubmit={handleUpdateLocation}></SearchInput>
        </View>
      </ImageBackground>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E'
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
    color: 'white'
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  }
});

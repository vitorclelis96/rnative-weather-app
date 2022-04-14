import { Keyboard, Text, StyleSheet, TextInput, TouchableOpacity, Alert, View, Dimensions } from "react-native";
import { ColorsLib } from "../styles/styles";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getWeather } from "../redux/weather/weatherSlice";
import WeatherCard from "../components/WeatherCard";
import { clearState } from "../redux/applicationState/applicationSlice";
import MapView from "react-native-maps";

const styles = StyleSheet.create({
    containerMain: {
        alignItems: 'center',
        marginTop: 10,
    },
    textMainHeader: {
        fontSize: 32,
        color: ColorsLib.babyBlue,
        fontWeight: 'bold',
    },
    input: {
        width: '90%',
        borderWidth: 1,
        borderColor: ColorsLib.silverPink,
        borderRadius: 10,
        height: 42,
        padding: 5,
        marginTop: 15,
        marginBottom: 25,
    },
    touchableOpacityBtn: {
        borderWidth: 1,
        borderColor: ColorsLib.silverPink,
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20,
    },
    containerMap: {
        marginTop: 15,
    },
    map: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('window').height,
    },
});

export default function Home() {
    const error = useSelector((state: RootState) => state.applicationState.error);
    const loading = useSelector((state: RootState) => state.applicationState.loading);
    const currentWeather = useSelector((state: RootState) => state.weather.currentWeather);
    const [searchCityInput, setSearchCityInput] = useState<string>();

    const dispatch = useDispatch();

    const disableSearchBtn = () => {
        if (!searchCityInput || searchCityInput.trim().length === 0) {
            return true;
        }
        if (loading) {
            return true;
        }
        return false;
    }

    const onSearchHandler = () => {
        Keyboard.dismiss();
        if (disableSearchBtn()) return;
        dispatch(getWeather(searchCityInput))
    }

    if (error) {
        Alert.alert('City not found', undefined, [
            {
                style: 'default',
                onPress: () => dispatch(clearState()),
            }
        ]);
    }

    return (
        <SafeAreaView style={styles.containerMain} >
            <Text style={styles.textMainHeader}>Weather app</Text>
            <TextInput
                onChangeText={setSearchCityInput}
                style={styles.input}
                placeholder="Input the city name"
                onEndEditing={onSearchHandler}
            />
            <TouchableOpacity
                disabled={disableSearchBtn()}
                style={styles.touchableOpacityBtn}
                onPressOut={onSearchHandler}
            >
                <AntDesign name="search1" size={32} color={ColorsLib.silverPink} />
            </TouchableOpacity>
            {
                currentWeather &&
                <WeatherCard weatherData={currentWeather} />
            }
            {
                currentWeather && !loading && (
                    <View style={styles.containerMap}>
                        <MapView
                            initialRegion={{
                                latitude: currentWeather.coord.lat,
                                longitude: currentWeather.coord.lon,
                                latitudeDelta: 0.03,
                                longitudeDelta: 0.03,
                            }}
                            style={styles.map}
                        />
                    </View>
                )
            }
        </SafeAreaView>
    )
}
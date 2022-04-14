import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from "react-redux";
import WeatherCard from "../components/WeatherCard";
import { RootState } from "../redux/store";
import { ColorsLib } from "../styles/styles";

const styles = StyleSheet.create({
    containerMain: {
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
    flatListStyle: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    alignCenter: {
        alignItems: 'center',
    },
});

export default function History() {
    const weatherList = useSelector((state: RootState) => state.weather.weatherHistoryList);

    const renderHistory = () => {
        return (
            <FlatList
                contentContainerStyle={styles.flatListStyle}
                data={weatherList}
                renderItem={({item}) => <WeatherCard weatherData={item} showDeleteBtn showRefreshBtn/>}
                keyExtractor={item => item.id.toString()}
            />
        )
    }

    return (
        <SafeAreaView style={styles.containerMain}>
            <View style={styles.alignCenter}>
                <Text style={styles.textMainHeader}>History</Text>
            </View>
            {
               weatherList && renderHistory()
            }
        </SafeAreaView>
    )
}
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { SimpleWeatherData } from "../interfaces/Weather";
import { getWeather, removeWeatherFromId } from "../redux/weather/weatherSlice";
import { ColorsLib } from "../styles/styles";
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { buildUSDateFromTimestamp } from "../utils/time";

interface WeatherCardProps {
    weatherData: SimpleWeatherData
    showRefreshBtn?: boolean,
    showDeleteBtn?: boolean
}

const style = StyleSheet.create({
    containerMain: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: ColorsLib.babyBlue,
        maxWidth: '90%',
        minWidth: '90%',
        marginHorizontal: 40,
        // paddingVertical: 50,
        padding: 10,
        marginTop: 20,
        justifyContent: 'space-between',
    },
    textHead: {
        fontSize: 24,
        fontWeight: 'bold',
        color: ColorsLib.mediumPurple,
    },
    textMainTemp: {
        fontSize: 20,
        color: ColorsLib.mediumPurple,
    },
    containerLeft: {
        marginRight: 15,
        flexShrink: 1,
    },
    textMinContent: {
        fontSize: 12,
        color: ColorsLib.romanSilver,
    },
    containerRight: {
        flexShrink: 1,
    }
});

export default function WeatherCard({ weatherData, showRefreshBtn, showDeleteBtn }: WeatherCardProps) {
    const dispatch = useDispatch();

    const shouldSeeActionMenu = showRefreshBtn || showDeleteBtn;

    const onRefreshHandler = () => {
        dispatch(getWeather(weatherData.city));
    }

    const onDeleteHandler = () => {
        dispatch(removeWeatherFromId(weatherData.id));
    }

    const renderButtons = () => {
        return (
            <View style={{ justifyContent: 'space-between'}}>
                {
                    showRefreshBtn && (
                        <TouchableOpacity onPressOut={onRefreshHandler}>
                            <Feather name="refresh-ccw" size={24} color={ColorsLib.babyBlue} />
                        </TouchableOpacity>
                    )
                }
                {
                    showDeleteBtn && (
                        <TouchableOpacity onPressOut={onDeleteHandler}>
                            <AntDesign name="delete" size={24} color={ColorsLib.silverPink} />
                        </TouchableOpacity>
                    )
                }
            </View>
        )
    }

    return (
        <View style={style.containerMain}>
            <View style={style.containerLeft}>
                <Text style={style.textHead}>{weatherData.city}</Text>
                <Text style={style.textMainTemp}>{`${weatherData.temp} ºC`}</Text>
            </View>
            <View style={style.containerRight}>
                <Text style={style.textMinContent}>{`Humidity: ${weatherData.humidity }%`}</Text>
                <Text style={style.textMinContent}>{`Max temperature: ${weatherData.max_temp } ºC`}</Text>
                <Text style={style.textMinContent}>{`Min temperature: ${weatherData.min_temp } ºC`}</Text>
                <Text style={style.textMinContent}>{buildUSDateFromTimestamp(weatherData.created_at)}</Text>
            </View>
            {
                (shouldSeeActionMenu) && renderButtons()
            }
        </View>
    )
}
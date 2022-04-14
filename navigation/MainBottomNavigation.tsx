import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';

import History from '../screens/History';
import Home from '../screens/Home';
import { ColorsLib } from '../styles/styles';


const Tab = createBottomTabNavigator();

interface tabBarIconProps {
  focused: boolean,
  color: string,
  size: number
}

const getIconColor: (focused: boolean) => string = (focused) => (
  focused ? ColorsLib.babyBlue : ColorsLib.romanSilver
)

const screens = [
  {
    name: "Home",
    component: Home,
    tabBarIcon: ({ focused, color, size }: tabBarIconProps): React.ReactNode => (
      <Feather name="sun" size={24} color={getIconColor(focused)} />
    ),
  },
  {
    name: "History",
    component: History,
    tabBarIcon: ({ focused, color, size }: tabBarIconProps) => (
      <FontAwesome name="history" size={24} color={getIconColor(focused)} />
    ),
  },
];

export default function MainBottomNavigation() {
  return (
      <Tab.Navigator>
        {
          screens.map(({name, component, tabBarIcon}) => (
            <Tab.Screen options={{
              headerShown: false,
              tabBarIcon,
            }} key={name} name={name} component={component} />
          ))
        }
      </Tab.Navigator>
  )
}
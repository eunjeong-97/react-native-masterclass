import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import colors from "../settings/color";

import Movies from "../screen/Movies";
import Tv from "../screen/Tv";
import Search from "../screen/Search";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Movies"
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.DARK_GRAY },
        tabBarActiveTintColor: colors.BURBPLE_LIGHT,
        tabBarLabelStyle: { fontSize: 13, fontWeight: "600" },
        tabBarInactiveTintColor: colors.WHITE_GRAY,
        headerStyle: { backgroundColor: colors.DARK_GRAY },
        headerTitleStyle: { color: colors.BURBPLE_LIGHT },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="film" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="tv" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

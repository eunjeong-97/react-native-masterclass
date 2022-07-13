import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Movies from '../screen/Movies'
import Tv from '../screen/Tv'
import Search from '../screen/Search'


const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Movies' component={Movies} />
            <Tab.Screen name='Tv' component={Tv} />
            <Tab.Screen name='Search' component={Search} />
        </Tab.Navigator>
    )
}

export default Tabs;
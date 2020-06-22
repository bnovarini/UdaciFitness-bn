import * as React from "react";
import { View, Platform } from "react-native";
import AddEntry from "./components/AddEntry";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import History from "./components/History";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { purple, white } from "./utils/colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const Tabs =
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Tabs.Navigator
            initialRouteName="AddEntry"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let icon;
                if (route.name === "Add Entry") {
                  icon = (
                    <FontAwesome name="plus-square" size={size} color={color} />
                  );
                } else if (route.name === "History") {
                  icon = (
                    <Ionicons name="ios-bookmarks" size={size} color={color} />
                  );
                }
                return icon;
              },
            })}
            tabBarOptions={{
              activeTintColor: Platform.OS === "ios" ? purple : white,
              style: {
                height: 80,
                backgroundColor: Platform.OS === "ios" ? white : purple,
                shadowColor: "rgba(0, 0, 0, 0.24)",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowRadius: 6,
                shadowOpacity: 1,
              },
            }}
          >
            <Tabs.Screen name="Add Entry" component={AddEntry} />
            <Tabs.Screen name="History" component={History} />
          </Tabs.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

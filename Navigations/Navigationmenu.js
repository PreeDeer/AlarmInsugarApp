import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  AppRegistry,
  ImageBackground,
  Pressable,
} from "react-native";

import {
  Button,
  TextInput,
  Avatar,
  Provider as PaperProvider,
  DefaultTheme,
  configureFonts,
  MD2LightTheme,
} from "react-native-paper";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Icon } from "react-native-elements";



import Home from "../screens/mainview/Home";
import Moremenu from "../screens/mainview/Moremenu";
import Alarmmain from "../screens/Alarm/Alarmmain";
import { NavigationContainer } from "@react-navigation/native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import HomeIcon from '../assets/icon/home.png'; 
import AlarmIcon from '../assets/icon/alarm.png'; 
import MoreIcon from '../assets/icon/more.png'; 

const Tab = createBottomTabNavigator();

export default function Navigationmenu({ navigation,route }) {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        console.log("userData:", userData);
        
        if (route.params && route.params.userData) {
          const userData = route.params.userData;
          setUserData(userData);
        }
      }, [route.params]);

  return (
    <Tab.Navigator
      initialRouteName={"หน้าหลัก"}
      initialParams={{ userData: route.params?.userData }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: {
          color: "rgba(230, 244, 241, 0.9)", // สีของตัวหนังสือในแท็บบาร์
        },
      }}
    >
      <Tab.Screen
        name="นาฬิกาปลุก"
        initialParams={{ userData: route.params?.userData }}
        component={Alarmmain}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={AlarmIcon} style={styles.icon} />
          ),
        }}
      />

      <Tab.Screen
        name="หน้าหลัก"
        initialParams={{ userData: route.params?.userData }}
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={HomeIcon} style={styles.icon} />
          ),
        }}
      />
      <Tab.Screen
        name="เพิ่มเติม"
        initialParams={{ userData: route.params?.userData }}
        component={Moremenu}
        options={{
          tabBarIcon: ({ color, size }) => (
                <Image source={MoreIcon} style={styles.icon} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  View: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    position: "absolute",
    height: 95,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0, 163, 238, 1)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
  },
  icon: {
    width: 35,
    height: 35,
    tintColor: '#fff' ,
  },

});

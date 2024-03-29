import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from "./screens/mainview/Login";
import OTPScreen from "./screens/mainview/OTP";
import RegisterScreen from "./screens/mainview/register";

import HomeScreen from "./screens/mainview/Home";
import AlarmmainScreen from "./screens/Alarm/Alarmmain";
import MoreScreen from "./screens/mainview/Moremenu";

import NavigationmenuScreen from "./Navigations/Navigationmenu";

import HyperAaugeIScreen from "./screens/usersscreens/Aauge/HyperglycemiaAauge";
import HypoAaugeIScreen from "./screens/usersscreens/Aauge/HypoglycemiaAauge";
import SugargradeScreen from "./screens/usersscreens/SugarGrade";
import ChatusersScreen from "./screens/usersscreens/Chatusers";
import GraphScreen from "./screens/usersscreens/Graph";

import GaugeHistoryScreen from "./screens/usersscreens/MedicalHistory/GaugeHistory";
import GraphHistoryScreen from "./screens/usersscreens/MedicalHistory/GraphHistory";

import ProflieScreen from "./screens/usersscreens/Proflie"; 

import HyperglycemiaInformationScreen from "./screens/usersscreens/HyperglycemiaInformation"; 
import HypoglycemiaInformationScreen from "./screens/usersscreens/HypoglycemiaInformation";

import loginAdminScreen from "./screenadmin/loginAdmin";
import HomeAdminScreen from "./screenadmin/HomeAdmin";
import IndexUsersScreen from "./screenadmin/IndexUsers";
import EditUserProScreen from "./screenadmin/EditUserPro";
import ReadHistoryUsersGScreen from "./screenadmin/ReadHitoryUserG";
import ReadHistoryUsersAScreen from "./screenadmin/ReadHitoryUserA";
import ChatAdminScreen from "./screenadmin/ChatAdmin";
//
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDLL0hW2jYVQd4DfgQOtzzLZm2kgi65wo4",
  authDomain: "insulindatabase.firebaseapp.com",
  databaseURL: "https://insulindatabase-default-rtdb.firebaseio.com",
  projectId: "insulindatabase",
  storageBucket: "insulindatabase.appspot.com",
  messagingSenderId: "567387156474",
  appId: "1:567387156474:web:7458796aac6baecf18be43",
  measurementId: "G-MNM84ZP3WN",
};

const app = initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
                <Stack.Screen
          name="OTP"
          component={OTPScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
        <Stack.Screen
          name="Navigationmenu"
          component={NavigationmenuScreen}
          options={{
            headerShown: false,
            title: "index", //แถบด้านล่าง
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />

        <Stack.Screen
          name="Alarmmain"
          component={AlarmmainScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />

        <Stack.Screen
          name="Moremenu"
          component={MoreScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />

<Stack.Screen
          name="loginAdmin"
          component={loginAdminScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />

<Stack.Screen
          name="HyperAaugeI"
          component={HyperAaugeIScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
        <Stack.Screen
          name="HypoAaugeI"
          component={HypoAaugeIScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
        <Stack.Screen
          name="Sugargrade"
          component={SugargradeScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
        <Stack.Screen
          name="Chatusers"
          component={ChatusersScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
        <Stack.Screen
          name="Graph"
          component={GraphScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
        <Stack.Screen
          name="GaugeHistory"
          component={GaugeHistoryScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
        <Stack.Screen
          name="GraphHistory"
          component={GraphHistoryScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
        <Stack.Screen
          name="Proflie"
          component={ProflieScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />

<Stack.Screen
          name="HyperglycemiaInformation"
          component={HyperglycemiaInformationScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
        <Stack.Screen
          name="HypoglycemiaInformation"
          component={HypoglycemiaInformationScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
        
                <Stack.Screen
          name="HomeAdmin"
          component={HomeAdminScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
                <Stack.Screen
          name="IndexUsers"
          component={IndexUsersScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
        <Stack.Screen
          name="EditUserPro"
          component={EditUserProScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
        <Stack.Screen
          name="ChatAdmin"
          component={ChatAdminScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />

        <Stack.Screen
          name="ReadHistoryUsersA"
          component={ReadHistoryUsersAScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
        <Stack.Screen
          name="ReadHistoryUsersG"
          component={ReadHistoryUsersGScreen}
          options={{
            headerShown: false,
            title: "",
            headerStyle: {
              backgroundColor: "#C3E3FE",
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {},
          }}
        />
              </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
import React from "react";
import {StyleSheet,} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {Icon} from "react-native-elements";


import Home from "../screens/Menumain/Home";
import Moremenu from "../screens/Menumain/Moremenu";
import Alarmmain from "../screens/Alarm/Alarmmain";

const Tab = createBottomTabNavigator();

export default function Navigationmenu() {
    return (
        <Tab.Navigator
            initialRouteName={"หน้าหลัก"}
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
                component={Alarmmain}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon
                            name="bell-circle"
                            type="material-community"
                            size={35}
                            color="rgba(230, 244, 241, 1)"
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="หน้าหลัก"
                component={Home}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon name="home" size={35} color="rgba(230, 244, 241, 1)"/>
                    ),
                }}
            />
            <Tab.Screen
                name="เพิ่มเติม"
                component={Moremenu}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Icon
                            name="view-grid-plus"
                            type="material-community"
                            size={35}
                            color="rgba(230, 244, 241, 1)"
                        />
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

});

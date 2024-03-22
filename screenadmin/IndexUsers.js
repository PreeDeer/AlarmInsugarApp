import * as React from "react";
import {useEffect, useState} from "react";
import {FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";

import {Button,} from "react-native-paper";
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//

const items = [
    {
        id: 1,
        name: "แก้ไขข้อมูล",
        boutton: "คลิ๊กที่นี่",
        image: require("../assets/imgMore/mpro.png"),
        component: 'EditUserPro',
        userData: null,
    },
    {
        id: 2,
        name: "พูดคุยกับผู้ใช้งาน",
        boutton: "คลิ๊กที่นี่",
        image: require("../assets/images/4.png"),
        component: 'ChatAdmin',
        userData: null,
    },
    {
        id: 3,
        name: "ประวัติการประเมินน้ำตาล",
        boutton: "คลิ๊กที่นี่",
        image: require("../assets/imgMore/ma.png"),
        component: 'ReadHistoryUsersA',
        userData: null,
    },
    {
        id: 4,
        name: "ประวัติการฉีดยา",
        boutton: "คลิ๊กที่นี่",
        image: require("../assets/imgMore/mg.png"),
        component: 'ReadHistoryUsersG',
        userData: null,
    },
];

const IndexUsers = ({navigation, route}) => {
    const [userData, setUserData] = useState(null);
    const [isPhoneNumberExist, setIsPhoneNumberExist] = useState(false);

    useEffect(() => {
        console.log("route.params in useEffect:", route.params);
        // เมื่อ component ถูก mount หรือ route.params มีการเปลี่ยนแปลง
        if (route.params && route.params.userData) {
            // ตรวจสอบว่ามีข้อมูลผู้ใช้ที่ถูกส่งมาหรือไม่
            const userData = route.params.userData;
            setUserData(userData);
        }
    }, [route.params]);

    const handleItemClick = async (item) => {
        if (item.component === 'EditUserPro') {
            navigation.navigate('EditUserPro', {userData});
        }
        if (item.component === 'ChatAdmin') {
            navigation.navigate('ChatAdmin', {userData});
        }
        if (item.component === 'ReadHistoryUsersA') {
            navigation.navigate('ReadHistoryUsersA', {userData});
        }
        if (item.component === 'ReadHistoryUsersG') {
            navigation.navigate('ReadHistoryUsersG', {userData});
        } else {
            console.warn(`No navigation logic defined for component: ${item.component}`);
        }
    };

    return (
        //--------------------------------------------------------------------------------//
        <SafeAreaView style={styles.backgroundImage}>
            <View style={styles.headerview}>
                <Text style={{...styles.TextName, marginTop: 100,}}>
                    {userData ? userData.username : "ไม่พบข้อมูล"}
                </Text>
            </View>
            <ImageBackground
                source={require("../assets/bgindexad.png")}
                style={styles.backgroundImage}
            >
                <View style={styles.container}>
                    <FlatList
                        data={items}
                        numColumns={2}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity
                                    style={styles.itemContainer}
                                    onPress={() => handleItemClick(item)}
                                >
                                    <View>
                                        <Image
                                            source={item.image}
                                            style={{
                                                width: 125,
                                                height: 125,
                                                marginBottom: 2,
                                                alignSelf: "center",
                                            }}
                                        />
                                        <Text style={styles.TexttitleB}>{item.name}</Text>
                                        <Button
                                            mode="contained"
                                            style={{backgroundColor: "#ade2ff", marginTop: 10}}
                                            onPress={() => handleItemClick(item)}
                                        >
                                            <Text
                                                style={{fontSize: 14, color: "rgba(36, 68, 85, 0.8)"}}
                                            >
                                                {item.boutton}
                                            </Text>
                                        </Button>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
    //--------------------------------------------------------------------------------//
};

const styles = StyleSheet.create({
    View: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        backgroundColor: "rgba(234, 252, 255, 0.4)",
    },

    headerview: {
        //หัวแสดงชื่อ
        alignItems: "center",
        backgroundColor: "rgba(173, 226, 255, 1)",
        width: "cover",
        height: 200,
        borderTopLeftRadius: 200,
        borderTopRightRadius: 200,
    },

    Textheader: {
        fontSize: 24,
        fontWeight: "bold",
        color: "rgba(0, 0, 0, 0.8)",
        marginBottom: 16,
    },
    TextW: {
        //Twellcome
        fontSize: 18,
        color: "rgba(36, 68, 85, 0.8)",
        margin: 6,
        marginTop: 25,
    },
    InputForm: {
        elevation: 3,
        shadowColor: "#757575",
        fontFamily: "Prompt-Regular",
        backgroundColor: "#f2f2f2",
        borderRadius: 15,
        margin: 6,
        width: 300,
    },
    inputLabel: {
        fontFamily: "Prompt-Regular",
        color: "#88AED0",
        height: 50,
    },
    ButtonS: {
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: "#ade2ff",
        padding: 20,
        margin: 6,
        width: 300,
        shadowColor: "rgba(0, 0, 0, 0.4)", // สีของเงา
        shadowOffset: {width: 0, height: 4}, // ตำแหน่งเงา (x, y)
        shadowOpacity: 0.5, // ความทึบของเงา
        shadowRadius: 6, // รัศมีของเงา
        elevation: 500, // Android: การยกขึ้นจากพื้น
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
    BackButton: {
        elevation: 5,
        marginTop: 45,
        marginLeft: 25,
        flexDirection: "row",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        width: 30,
        height: 30,
    },
    TextName: {
        fontWeight: "bold",
        fontSize: 30,
        color: "rgba(36, 68, 85, 0.8)",
        margin: 6,
        marginTop: 28,
    },
    Textheaddata: {
        //เว้นห่างๆ
        fontSize: 14,
        color: "rgba(36, 68, 85, 0.8)",
        marginTop: 8,
        margin: 50,
        marginBottom: 3,
    },
    Textheaddata2: {
        //ข้อความย่อยๆ
        fontSize: 14,
        color: "rgba(36, 68, 85, 0.8)",
        marginTop: 8,
        margin: 5,
        marginBottom: 3,
    },

    //////////////////////////////////////////
    itemContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
        padding: 30,
        paddingHorizontal: 3,
        backgroundColor: "white",
        borderRadius: 25,
        shadowColor: "#000", // สีของเงา
        shadowOffset: {width: 0, height: 2}, // ตำแหน่งเงา (x, y)
        shadowOpacity: 0.2, // ความทึบของเงา
        shadowRadius: 5, // รัศมีของเงา
        elevation: 5, // Android: การยกขึ้นจากพื้น
    },
    container: {
        flex: 1,
    },
    TexttitleB: {
        fontSize: 16,
        color: "rgba(36, 68, 85, 0.8)",
        textAlign: "center",
    },
    ButtonTexttitle: {
        fontSize: 14,
        marginTop: 10,
        color: "rgba(36, 68, 85, 0.8)",
    },
});

export default IndexUsers;

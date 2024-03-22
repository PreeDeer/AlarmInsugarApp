import * as React from "react";
import {useEffect, useState} from "react";
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {TextInput,} from "react-native-paper";
import {getAuth, signOut} from "firebase/auth";
import {get, getDatabase, ref} from "firebase/database";
import {Icon} from "react-native-elements";

const HomeAdmin = ({navigation, route}) => {
    const [searchText, setSearchText] = useState("");
    const [userData, setUserData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase();
            const usersRef = ref(db, "users");

            try {
                const snapshot = await get(usersRef);
                if (snapshot.exists()) {
                    const userDataArray = Object.entries(snapshot.val()).map(
                        ([key, value]) => ({
                            id: key,
                            ...value,
                            iconColor: "white",
                        })
                    );

                    for (const user of userDataArray) {
                        const roomsRef = ref(db, `rooms/${user.id}`);
                        const roomsSnapshot = await get(roomsRef);
                        user.hasRooms = roomsSnapshot.exists();

                        if (user.hasRooms) {
                            const chatusersRef = ref(db, `rooms/${user.id}`);
                            const chatusersSnapshot = await get(chatusersRef);

                            if (chatusersSnapshot.exists()) {
                                const userIdChat = chatusersSnapshot.key;
                                const roomData = chatusersSnapshot.val();

                                for (const messageId in roomData) {
                                    if (Object.hasOwnProperty.call(roomData, messageId)) {
                                        const message = roomData[messageId];
                                        const usernameInRooms = message.username;

                                        const usersRef = ref(db, `users/${userIdChat}`);
                                        const usersSnapshot = await get(usersRef);

                                        if (usersSnapshot.exists()) {
                                            const usernameInUsers = usersSnapshot.val().username;
                                            const usernameInRooms = message.username;

                                            user.iconColor = usernameInUsers === usernameInRooms ? "green" : "red";

                                            console.log(`${usernameInUsers} = ${usernameInRooms}`);
                                            console.log(
                                                `Username in rooms ${
                                                    usernameInUsers === usernameInRooms ? "matches" : "does not match"
                                                } username in users for user ${userIdChat}`
                                            );
                                        } else {
                                            console.log(
                                                `User with userId ${userIdChat} does not exist`
                                            );
                                        }
                                    }
                                }
                            } else {
                                console.log(`No rooms found for user ${user.id}`);
                            }
                        }
                    }

                    setUserData(userDataArray);
                    setFilteredData(userDataArray);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [route.params, userData]);

    const handleSearch = () => {
        // Filter data based on the search text
        const filtered = userData.filter((item) =>
            item.username.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleUsers = (item) => {
        // ให้ไปที่หน้า IndexUsers และส่งข้อมูลไปด้วย
        navigation.navigate("IndexUsers", {userData: item});
    };

    const handleLogout = async () => {
        try {
            const auth = getAuth();
            await signOut(auth);
            navigation.navigate("Login"); // นำผู้ใช้ออกจากระบบและนำกลับไปยังหน้า Login
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <SafeAreaView style={styles.backgroundImage}>
            <View style={styles.View}>
                <View style={{...styles.searchInput, flexDirection: "row"}}>
                    <TextInput
                        style={styles.inputLabel}
                        placeholder="ค้นหารายชื่อ..."
                        value={searchText}
                        onChangeText={(text) => setSearchText(text)}
                    />
                    <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                        <Icon name="search" type="material" size={25} color="white"/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.Textheader1}>รายชื่อผู้ใช้งาน</Text>
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item?.id?.toString()}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={styles.itemContainer}
                            onPress={() => handleUsers(item)}
                        >
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Icon
                                    name={item.hasRooms ? "circle" : "circle"}
                                    type="font-awesome"
                                    color={
                                        item.iconColor
                                    }
                                    size={20}
                                    style={styles.redDot}
                                />
                                <Text style={styles.Textheader}>คุณ : {item.username}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.buttonText}>ออกจากระบบ</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
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
    BackButton: {
        elevation: 5,
        marginTop: 15,
        marginLeft: 15,
        flexDirection: "row",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        width: 35,
        height: 35,
    },
    itemContainer: {
        flex: 1,
        width: 350,
        margin: 8,
        marginTop: 8,
        padding: 30,
        paddingHorizontal: 3,
        backgroundColor: "white",
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    Textheader1: {
        fontSize: 24,
        fontWeight: "bold",
        color: "rgba(0, 0, 0, 0.8)",
        marginBottom: 16,
        marginTop: 18,
    },
    Textheader: {
        fontSize: 18,
        fontWeight: "bold",
        color: "rgba(0, 0, 0, 0.7)",
        marginLeft: 10,
    },
    searchInput: {
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        shadowColor: "#000",
        fontFamily: "Prompt-Regular",
        backgroundColor: "white",
        borderRadius: 200,
        borderTopRightRadius: 200,
        borderTopLeftRadius: 200,
        margin: 10,
        width: 300,
        borderWidth: 1,
        borderColor: "#9BAEBC",
    },
    inputLabel: {
        fontSize: 18,
        fontFamily: "Prompt-Regular",
        color: "#88AED0",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        height: 40,
        marginStart: 18,
        width: 200,
        padding: 10,
    },
    searchButton: {
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        shadowColor: "#000",
        fontFamily: "Prompt-Regular",
        backgroundColor: "#66B8E6",
        borderRadius: 200,
        borderTopRightRadius: 200,
        borderTopLeftRadius: 200,
        margin: 6,
        width: 50,
        padding: 10,
        marginStart: 18,
    },
    logoutButton: {
        backgroundColor: "#FF6347",
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    redDot: {
        marginRight: 5,
        marginStart: 18,
        marginTop: 5,
    },
});

export default HomeAdmin;

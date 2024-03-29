import * as React from "react";
import { useState, useEffect } from "react";

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
  Modal,
} from "react-native";

import {
  Button,
  TextInput,
  Avatar,
  Provider as PaperProvider,
  DefaultTheme,
  configureFonts,
  MD2LightTheme,
  Card,
} from "react-native-paper";

//--------------------------------------------------------------------------------//
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  get,
} from "firebase/database";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { Icon } from "react-native-elements";
import BackIcon from '../../assets/icon/black.png'; 

const Proflie = ({ navigation, route }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    console.log("route.params in useEffect:", route.params);
    // เมื่อ component ถูก mount หรือ route.params มีการเปลี่ยนแปลง
    if (route.params && route.params.userData) {
      // ตรวจสอบว่ามีข้อมูลผู้ใช้ที่ถูกส่งมาหรือไม่
      const userData = route.params.userData;
      setUserData(userData);
      console.log("user",userData);
    }
    
  }, [route.params]);

  const handleLogout = async () => {
    navigation.replace("Login"); 
  };

  return (
    //--------------------------------------------------------------------------------//
    <SafeAreaView style={styles.backgroundImage}>
      <TouchableOpacity
        style={styles.BackButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.85}
      >
        <Image source={BackIcon} style={styles.icon} />
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <View style={{ ...styles.itemContainer }}>
          <Text style={styles.Textheader}>ข้อมูลส่วนตัว</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...styles.Textmain }}>ชื่อ : </Text>
            <Text style={styles.Textdata}>
{(userData && userData.username) || "ชื่อ-สกุล"}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...styles.Textmain }}>เพศ : </Text>
            <Text style={styles.Textdata}>
            {(userData && userData.gender) || "เพศ"}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...styles.Textmain }}>วันเดือนปีเกิด : </Text>
            <Text style={styles.Textdata}>
            {(userData && userData.birthDate) || "วว/ดด/ปป"}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...styles.Textmain }}>น้ำหนัก : </Text>
            <Text style={styles.Textdata}>
            {(userData && userData.weight) || "000"}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...styles.Textmain }}>ส่วนสูง : </Text>
            <Text style={styles.Textdata}>
            {(userData && userData.height) || "000"}
            </Text>
          </View>
          <Text style={styles.Textheader}>ข้อมูลการรักษา</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...styles.Textmain }}>ค่าน้ำตาลในเลือด : </Text>
            <Text style={styles.Textdata}>
            {(userData && userData.minsugar) || "mg/dL"}
            </Text>
            <Text style={styles.Textdata}>-</Text>
            <Text style={styles.Textdata}>
            {(userData && userData.maxsugar) || "mg/dL"}
            </Text>
            <Text style={styles.Textdata}>mg/dL</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...styles.Textmain }}>ชนิดยาอินซูลิน : </Text>
            <Text style={styles.Textdata}>
            {(userData && userData.insulinType) || "ชนิด"}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...styles.Textmain }}>จำนวนยูนิต : </Text>
            <Text style={styles.Textdata}>
            {(userData && userData.insulinUnits) || "00"}
            </Text>
            <Text style={styles.Textdata}>ยูนิต</Text>
          </View>

          <View style={{ ...styles.View }}>
            <TouchableOpacity
              style={styles.LogoutButton}
              onPress={handleLogout}
              activeOpacity={0.85}
            >
              <Text style={styles.LogoutButtonText}>ออกจากระบบ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    margin: 18,
    padding: 30,
    paddingHorizontal: 3,
    backgroundColor: "white",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  Textheader: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.8)",
    marginBottom: 16,
  },
  Textmain: {
    marginLeft: 18,
    fontSize: 18,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.8)",
    marginBottom: 16,
  },
  Textdata: {
    fontSize: 18,
    marginLeft: 8,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.6)",
    marginBottom: 16,
  },
  LogoutButton: {
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#66B8E6",
    borderRadius: 5,
    padding: 8,
    elevation: 2,
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 500,
  },
  LogoutButtonText: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  icon: {
    marginStart: 8,
    width: 25,
    height: 25,
    tintColor: '#374955' ,
  },
});

export default Proflie;

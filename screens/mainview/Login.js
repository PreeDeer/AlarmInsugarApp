import * as React from "react";
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
  Modal
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

import {
  get,
  ref,
  query,
  orderByChild,
  equalTo,
  getDatabase,
} from "firebase/database";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
  onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword
} from "firebase/auth";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "react-native-google-recaptcha";
import { initializeApp, getApp } from "firebase/app";

import AdminIcon from '../../assets/icon/admin.png'; 
import PhoneIcon from '../../assets/icon/phone.png'; 
//--------------------------------------------------------------------------------//

const Login = ({ navigation }) => {

  const [phoneNumber, setPhoneNumber] = React.useState();
  const [userData, setUserData] = React.useState(null);

  const checkPhoneNumberExists = async (phoneNumber) => {
    try {
      // เชื่อมต่อกับ Firebase Realtime Database
      const db = getDatabase();
      const usersRef = ref(db, 'users');
      const userQuery = query(usersRef, orderByChild('phoneNumber'), equalTo(phoneNumber));
      const snapshot = await get(userQuery);
      
      return snapshot.exists();
    } catch (error) {
      console.error('Error fetching user:', error.message);
      throw error;
    }
  };
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const db = getDatabase();
        const usersRef = ref(db, 'users');
        const userQuery = query(usersRef, orderByChild('phoneNumber'), equalTo(phoneNumber));
        const snapshot = await get(userQuery);
        
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUserData(userData);
        }
      } catch (error) {
        console.error('Error fetching user:', error.message);
      }
    };

    if (phoneNumber) {
      fetchUserData();
    }
  }, [phoneNumber]);

  const handleLogin = async () => {
    try {
      const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
      const phoneNumberExists = await checkPhoneNumberExists(formattedPhoneNumber);
  
      if (phoneNumberExists) {
        console.log('มีข้อมูลผู้ใช้ในฐานข้อมูล', formattedPhoneNumber);
  
        // ดึงข้อมูลผู้ใช้ที่มีเบอร์โทรศัพท์ตรงกับ formattedPhoneNumber
        const db = getDatabase();
        const usersRef = ref(db, 'users');
        const userQuery = query(usersRef, orderByChild('phoneNumber'), equalTo(formattedPhoneNumber));
        const snapshot = await get(userQuery);
  
        if (snapshot.exists()) {
          const users = snapshot.val();
          const userKey = Object.keys(users).find(key => users[key].phoneNumber === formattedPhoneNumber);
        
          if (userKey) {
            const userData = users[userKey];
            //
            userData.userID = userKey;
            //console.log("yes",userData);
            navigation.replace("Navigationmenu", { userData });
            return userData;
          } else {
            throw new Error('User not found');
          }
        } else {
          throw new Error('No users found');
        }
        
      } else {
        console.log('ไม่พบข้อมูลผู้ใช้ในฐานข้อมูล');
      }
  
    } catch (error) {
      console.error('Error fetching user:', error.message);
    }
  };
  
  
  // ฟังก์ชันเพื่อจัดรูปแบบเบอร์โทรศัพท์ใหม่ตามที่ระบุ
  const formatPhoneNumber = (phoneNumber) => {
    return phoneNumber.startsWith("0")
      ? `+66${phoneNumber.substring(1)}`
      : phoneNumber;
  };
    //--------------------------------------------------------------------------------//
    const handleSignUp = () => {
      // ทำตามที่คุณต้องการเมื่อคลิกที่ลิงก์สมัครสมาชิก
      console.log("Redirecting to sign-up screen");
      navigation.navigate("Register");
    };

  const handleLogigAdmin = () => {
    console.log("Navigating to loginAdmin");
    navigation.navigate("loginAdmin");
  };

  return (
    <ImageBackground
      source={require("../../assets/bg.png")}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.backgroundImage}>
        
        <TouchableOpacity
          style={styles.BackButton}
          onPress={handleLogigAdmin}
        >
          <Image source={AdminIcon} style={styles.icon} />
        </TouchableOpacity>


        <View style={styles.View}>
          

          <Text style={styles.Textheader}>Login</Text>

          <TextInput
            left={
              <TextInput.Icon
                icon={({ size, color }) => (
                    <Image source={PhoneIcon} style={styles.icon} />
                )}/>}
            keyboardType="phone-pad"
            autoFocus
            autoCompleteType="tel"
            placeholderTextColor="#A4A6A8"
            mode={"flat"}
            placeholder="เบอร์โทรศัพท์"
            placeholderStyle={styles.InputForm}
            style={styles.InputForm}
            labelStyle={styles.inputLabel}
            value={phoneNumber}
            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
            selectionColor="#88AED0"
            cursorColor="#88AED0"
            underlineColor="rgba(255, 255, 255, 0)"
            activeUnderlineColor="rgba(255, 255, 255, 0)"
            outlineColor="#88AED0"
            activeOutlineColor="#88AED0"
            textColor="#1b1b1b"
            height="90"
          />

          <TouchableOpacity
            style={styles.ButtonS}
            disabled={!phoneNumber}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>เข้าสู่ระบบ</Text>
          </TouchableOpacity>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text style={styles.signUpLink}>
              หากท่านยังไม่สมัครบัญชีผู้ใช้งาน
            </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signUpLinkBt}>โปรดคลิ๊กสมัครที่นี่</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
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
    resizeMode: "cover", // ให้รูปภาพปรับขนาดเพื่อครอบคลุมพื้นที่ทั้งหมด
    justifyContent: "center",
  },
  Textheader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.8)",
    marginBottom: 16,
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
    borderRadius: 10,
    width: 300,
    shadowColor: "rgba(0, 0, 0, 0.4)", // สีของเงา
    shadowOffset: { width: 0, height: 4 }, // ตำแหน่งเงา (x, y)
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
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(255, 255, 255, 0.8)", 
    width: 45,
    height: 45,
    zIndex: 1,
  },
  
  signUpLink: {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.8)",
    marginTop: 18,
  },
  signUpLinkBt: {
    fontSize: 14,
    color: "rgba(0, 87, 174, 1)",
    marginTop: 18,
    margin: 6,
  },

  icon: {
    width: 24,
    height: 24,
    tintColor: '#374955' ,
  },
  
});

export default Login;

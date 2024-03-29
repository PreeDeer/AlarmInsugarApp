import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  ImageBackground,
  StatusBar,
  Platform,
} from "react-native";
import {
  Button,
  TextInput,
} from "react-native-paper";
import { signInWithCredential } from "firebase/auth";
import { FirebaseRecaptchaBanner } from "react-native-google-recaptcha";

const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const OTP = ({ navigation, route }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [attemptInvisibleVerification, setAttemptInvisibleVerification] = useState(true);

  const auth = route.params.auth;
  const verificationId = route.params.verificationId;
  const phoneNumber = route.params.phoneNumber;

  // Function to resend OTP
  const resendOtp = async () => {
    try {
      // ใส่โค้ดสำหรับการส่ง OTP อีกครั้งที่นี่
    } catch (err) {
      Alert.alert("เกิดข้อผิดพลาด", `Error: ${err.message}`);
    }
  };

  return (
    <ImageBackground source={bgImg} style={styles.backgroundStyle}>
      <View style={styles.View}>
        
        <TextInput
          left={<TextInput.Icon icon="email-receive-outline" disabled />}
          keyboardType="number-pad"
          placeholderTextColor="#A4A6A8"
          mode={"flat"}
          placeholder="ใส่ OTP ที่ได้รับ"
          placeholderStyle={styles.InputForm}
          style={styles.InputForm}
          labelStyle={styles.inputLabel}
          selectionColor="#88AED0"
          cursorColor="#88AED0"
          underlineColor="rgba(255, 255, 255, 0)"
          activeUnderlineColor="rgba(255, 255, 255, 0)"
          outlineColor="#88AED0"
          activeOutlineColor="#88AED0"
          textColor="#1b1b1b"
          height="90"
          onChangeText={setVerificationCode}
        />

        
        <Button
          mode="elevated"
          style={styles.LoginButton}
          labelStyle={styles.LoginButtonLabel}
          onPress={async () => {
            try {
              const credential = PhoneAuthProvider.credential(
                verificationId,
                verificationCode
              );
              await signInWithCredential(auth, credential);
              navigation.replace("Navigationmenu", { phoneNumber });
            } catch (err) {
              if (err.code === "auth/code-expired") {
                Alert.alert('รหัส OTP หมดอายุ', `โปรดกดส่งรหัส OTP ใหม่อีกครั้ง`);
              } else {
                Alert.alert("การยืนยันด้วยรหัส OTP ไม่สำเร็จ", `Error: ${err.message}`);
              }
            }
          }}
        >
          เข้าสู่ระบบ
        </Button>
        <Text style={styles.textBtn} onPress={resendOtp}>
          ยังไม่ได้รับ OTP? คลิกที่นี่
        </Text>
        {message ? (
          <TouchableOpacity
            style={[StyleSheet.absoluteFill, { justifyContent: "center" }]}
            onPress={() => setMessage("")}
          >
            <Text
              style={{
                color: message.color || "blue",
                fontSize: 17,
                textAlign: "center",
                margin: 20,
              }}
            >
              {message}
            </Text>
          </TouchableOpacity>
        ) : undefined}
            {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
      </View>
    </ImageBackground>
  );
};

const styles = {
  backgroundStyle: {
    flex: 1,
    paddingTop: statusBarHeight,
  },
  View: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  InputForm: {
    elevation: 3,
    shadowColor: '#757575',
    fontFamily: 'Prompt-Regular',
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    margin: 6,
    width: 300,
  },
  LoginButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ade2ff",
    margin: 8,
    borderRadius: 10,
    width: 300,
    height: 65,
    shadowColor: "rgba(0, 0, 0, 0.4)", // สีของเงา
    shadowOffset: { width: 0, height: 4 }, // ตำแหน่งเงา (x, y)
    shadowOpacity: 0.5, // ความทึบของเงา
    shadowRadius: 6, // รัศมีของเงา
    elevation: 500, // Android: การยกขึ้นจากพื้น
  },
  LoginButtonLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Prompt-Bold",
    verticalAlign: "middle",
    color: "#fff",
  },
  textBtn: {
    color: "#88AED0",
    fontFamily: "Prompt-Regular",
  },
};

export default OTP;

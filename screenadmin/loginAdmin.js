import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  ImageBackground,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  get,
  set,
} from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  onAuthStateChanged 
} from "firebase/auth";

const loginAdmin = ({ navigation, route }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [waitingForEmailConfirmation, setWaitingForEmailConfirmation] = React.useState(false); // เพิ่ม state เพื่อตรวจสอบว่ากำลังรอการยืนยันทางอีเมลหรือไม่

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      if (user && !user.emailVerified) {
        // ถ้ามีผู้ใช้และยังไม่ได้ยืนยันทางอีเมล
        Alert.alert('กรุณายืนยันอีเมลของคุณ');
        setWaitingForEmailConfirmation(true);
      } else if (user && user.emailVerified) {
        // ถ้ามีผู้ใช้และได้รับการยืนยันทางอีเมลแล้ว
        navigation.navigate('HomeAdmin');
      }
    });

    return unsubscribe;
  }, []);

  const handleLoginAdmin = async () => {
    try {
      if (!email || !password) {
        Alert.alert("กรุณากรอกอีเมลและรหัสผ่าน");
        return;
      }
  
      const db = getDatabase();
      const adminRef = ref(db, "admin");
  
      const snapshot = await get(
        query(adminRef, orderByChild("email"), equalTo(email))
      );
      const adminData = snapshot.val();
  
      if (adminData) {
        const adminId = Object.keys(adminData)[0];
        const adminInfo = adminData[adminId];
  
        if (adminInfo.password === password) {
          console.log("ยืนยันอีเมล", email);
  
          const auth = getAuth(); 
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
          if (!userCredential.user.emailVerified) {
            // ถ้ายังไม่ได้รับการยืนยันทางอีเมล
            await sendEmailVerification(auth.currentUser);
            setWaitingForEmailConfirmation(true);
            Alert.alert('กรุณายืนยันอีเมลของคุณ');
          } else {
            // ถ้าได้รับการยืนยันทางอีเมลแล้ว
            navigation.navigate('HomeAdmin');
          }
        } else {
          console.log("รหัสผ่านไม่ถูกต้อง");
          Alert.alert("รหัสผ่านไม่ถูกต้อง");
        }
      } else {
        console.log("ไม่พบอีเมลในฐานข้อมูล");
        Alert.alert("ไม่พบอีเมลในฐานข้อมูล");
      }
    } catch (error) {
      const auth = getAuth(); 
      let userCredential;

      try {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User created:", user.uid);

        // ส่งอีเมลยืนยันตัวตน
        await sendEmailVerification(user);

        // แสดงข้อความเตือนให้ผู้ใช้ยืนยันอีเมล
        Alert.alert("กรุณายืนยันอีเมลของคุณ");

        // รอผู้ใช้ยืนยันอีเมลและนำไปสู่หน้าหลัก
        setWaitingForEmailConfirmation(true);
      } catch (error) {
        console.log("เกิดข้อผิดพลาดในการสร้างบัญชีผู้ใช้ตรวจสอบการยืนยันตัวตนในอีเมลอีกครั้ง:", error.message);
        Alert.alert("เกิดข้อผิดพลาดในการสร้างบัญชีผู้ใช้ตรวจสอบการยืนยันตัวตนในอีเมลอีกครั้ง:", error.message);
      }
    }
  };
  
  return (
    <ImageBackground
      source={require("../assets/bg.png")}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.backgroundImage}>
        <View style={styles.View}>
          <Text style={styles.Textheader}>Login</Text>

          <TextInput
            left={<TextInput.Icon icon="account" disabled />}
            autoFocus
            autoCompleteType="email"
            placeholderTextColor="#A4A6A8"
            mode={"flat"}
            placeholder="e-mail"
            placeholderStyle={styles.InputForm}
            style={styles.InputForm}
            labelStyle={styles.inputLabel}
            value={email}
            onChangeText={(email) => setEmail(email)}
            selectionColor="#88AED0"
            cursorColor="#88AED0"
            underlineColor="rgba(255, 255, 255, 0)"
            activeUnderlineColor="rgba(255, 255, 255, 0)"
            outlineColor="#88AED0"
            activeOutlineColor="#88AED0"
            textColor="#1b1b1b"
            height="90"
          />
          <TextInput
            left={<TextInput.Icon icon="lock" disabled />}
            autoFocus
            autoCompleteType="password"
            secureTextEntry={true}
            placeholderTextColor="#A4A6A8"
            mode={"flat"}
            placeholder="รหัสผ่าน"
            placeholderStyle={styles.InputForm}
            style={styles.InputForm}
            labelStyle={styles.inputLabel}
            value={password}
            onChangeText={(password) => setPassword(password)}
            selectionColor="#88AED0"
            cursorColor="#88AED0"
            underlineColor="rgba(255, 255, 255, 0)"
            activeUnderlineColor="rgba(255, 255, 255, 0)"
            outlineColor="#88AED0"
            activeOutlineColor="#88AED0"
            textColor="#1b1b1b"
            height="90"
          />

          <TouchableOpacity style={styles.ButtonS} onPress={handleLoginAdmin}>
            <Text style={styles.buttonText}>เข้าสู่ระบบ</Text>
          </TouchableOpacity>
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
  Textheader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.8)",
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default loginAdmin;

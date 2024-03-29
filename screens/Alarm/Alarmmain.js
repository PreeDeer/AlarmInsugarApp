import * as React from "react";
import { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
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
  ScrollView,
  Linking,
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
  Switch,
  TimePicker,
} from "react-native-paper";

//--------------------------------------------------------------------------------//

const items = [
  {
    id: 1,
    name: "ช่วงเช้า",
    Title: "{time} ",
    image: require("../../assets/bgalarm1.png"),
    music: " ",
    days: "อา.,จ.,อ.,พ.,พฤ.,ศ.,ส.",
    switchs: true,
  },
  {
    id: 2,
    name: "ช่วงเที่ยง",
    Title: "{time} ",
    image: require("../../assets/bgalarm2.png"),
    music: " ",
    days: "อา.,จ.,อ.,พ.,พฤ.,ศ.,ส.",
    switchs: true,
  },
  {
    id: 3,
    name: "ช่วงเย็น",
    Title: "{time} ",
    image: require("../../assets/bgalarm3.png"),
    music: " ",
    days: "อา.,จ.,อ.,พ.,พฤ.,ศ.,ส.",
    switchs: true,
  },
];

const thaiToEnglishDays = {
  "อา.": "Sun",
  "จ.": "Mon",
  "อ.": "Tue",
  "พ.": "Wed",
  "พฤ.": "Thu",
  "ศ.": "Fri",
  "ส.": "Sat",
};

const Alarmmain = ({ navigation, route }) => {
  const { alarmsData } = route.params || {};

  const [switchStates, setSwitchStates] = useState(
    items.map((item) => item.switchs)
  );
  const [selectedDays, setSelectedDays] = useState({});
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  const [alarms, setAlarms] = useState([]);

  const askForNotificationPermission = async () => {

  };

  useEffect(() => {

  }, []);

  

  const renderTitleWithTime = (cardId) => {

  };

  // เพิ่มฟังก์ชันที่ให้ข้อมูลจาก SQLList หรือที่เก็บข้อมูลไว้ (ในที่นี้ให้ใช้ข้อมูลจาก state เป็นตัวอย่าง)
  const getFetchedDataForCardId = (cardId) => {

  };

  const checkDayInSQLList = (cardId, day) => {
 
  };

  const onToggleSwitch = async (itemId) => {
 
  };
  

  /*************************************************************** */

  // ในฟังก์ชัน NotificationAlarmId
  const NotificationAlarmId = async (itemId, englishDays,switchState) => {
  
  };

  /*************************************************************** */
  const handleCardPress = (itemId, itemImage) => {
    navigation.navigate("AlarmClock", {
      cardId: itemId,
      cardImage: itemImage,
      selectedDays,
      alarmsData,
    });
    console.log(`Card with ID ${itemId} pressed`);
  };

  return (
    <SafeAreaView style={styles.backgroundImage}>
      
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={styles.View}>
            {items.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleCardPress(item.id, item.image)}
                activeOpacity={0.8}
              >
                <Card style={styles.Card}>
                  <Card.Cover source={item.image} style={styles.CardImage} />
                  <Card.Content>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <Text style={{ ...styles.CardTitle, width: 175 }}>
                        {item.name}
                      </Text>
                      <Switch
                        value={switchStates[item.id - 1]}
                        onValueChange={() => onToggleSwitch(item.id)}
                      />
                    </View>
                    {renderTitleWithTime(item.id)}

                    {switchStates[item.id - 1] && (
                      <View>
                        <Text>{item.music}</Text>

                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                          {item.days.split(",").map((day, index) => (
                            <View
                              key={index}
                              style={[
                                styles.dayButton,
                                (selectedDays[item.id] &&
                                  selectedDays[item.id].includes(day.trim())) ||
                                checkDayInSQLList(item.id, day.trim()) // เพิ่มเงื่อนไขเช็คว่าวันนี้มีใน SQLList หรือไม่
                                  ? styles.selectedDayButton
                                  : null,
                              ]}
                            >
                              <Text style={styles.dayButtonText}>
                                {day.trim()}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
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
  Textheader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.8)",
    marginBottom: 16,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  Card: {
    marginBottom: 20,
    elevation: 5,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
  },
  CardImage: {
    width: 375,
    height: 95,
    marginBottom: 10,
    borderRadius: 0,
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
  },
  CardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  CardDescription: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.5)",
  },
  CardTitleinfor: {
    fontSize: 14,
    marginBottom: 5,
    color: "rgba(0, 0, 0, 0.8)",
  },

  dayButton: {
    backgroundColor: "#66B8E6",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  selectedDayButton: {
    backgroundColor: "#2ecc71", // สีเมื่อถูกเลือก
  },
  dayButtonText: {
    color: "#fff",
  },
});

export default Alarmmain;

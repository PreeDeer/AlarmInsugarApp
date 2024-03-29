import React from "react";
import { View, Text, ScrollView } from "react-native";
import { GestureHandlerRootView} from 'react-native-gesture-handler';


const MessageList = ({ messages }) => {
  return (
    <View style={{ flex: 1, margin: 18 }}>
      <GestureHandlerRootView>
        <ScrollView>
      {messages.map((message, index) => (
        <View
          key={index}
          style={{
            padding: 10,
            marginBottom: 10,
            borderRadius: 10,
            alignSelf: message.username === "Admin" ? "flex-start" : "flex-end",
            backgroundColor: message.username === "Admin" ? "#e0e0e0" : "#66B8E6",
            maxWidth: "80%",
          }}
        >
            <Text style={{ color: message.username === "Admin" ? "#000" : "#fff" }}>
            {message.messageText}
          </Text>
        </View>
      ))}
      </ScrollView>
      </GestureHandlerRootView>
    </View>
  );
};

export default MessageList;

import * as React from "react";
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {Icon} from "react-native-elements";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

const HyperglycemiaInformation = ({navigation, router}) => {
    return (
        <SafeAreaView style={styles.backgroundImage}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.85}
                >
                    <Icon name="chevron-back" size={24} color="#1b1b1b" type="ionicon"/>
                </TouchableOpacity>
                <Text style={styles.headerText}>อาการน้ำตาลในเลือดสูง</Text>
            </View>

            <ScrollView>
                <View style={styles.itemContainer}>
                    <Image
                        source={require("../../assets/hyper.png")}
                        style={styles.imageS}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        backgroundColor: "rgba(234, 252, 255, 0.4)",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    backButton: {
        marginRight: 10,
    },
    itemContainer: {
        width: wp('100%'),
        justifyContent: "center",
        alignItems: "center",
    },
    imageS: {
        width: wp('100%'),
        height: hp('100%'),
        resizeMode: "cover",
    },
});

export default HyperglycemiaInformation;

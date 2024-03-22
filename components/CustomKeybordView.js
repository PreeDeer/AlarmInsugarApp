import * as React from "react";
import {KeyboardAvoidingView, Platform, ScrollView,} from "react-native";

const ios = Platform.OS == "ios";
export default function CustomKeybordView({children, inChat}) {
    let kavConfig = {};
    let ScrollViewConfig = {};
    if (inChat) {
        kavConfig = {keyboardVerticalOffset: 10};
        ScrollViewConfig = {contentContainerStyle: {flex: 1}};
    }
    return (
        <KeyboardAvoidingView
            behavior={ios ? "padding" : "height"}
            style={{flex: 1}}
            {...kavConfig}
        >
            <ScrollView
                style={{flex: 1}}
                bounces={false}
                showsVerticalScrollIndicator={false}
                {...ScrollViewConfig}
            >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

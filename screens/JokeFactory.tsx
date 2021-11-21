import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from '../helpers/types';
import { View, Text, Button, TextInput, Pressable, StyleSheet } from "react-native";
import * as React from 'react';
import { useEffect, useState } from "react";
import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const JokeFactory: React.FC<NativeStackScreenProps<StackScreens, "RandomJoke">> = (props) => {

    const [joke, setJoke] = useState("");
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        setDisabled(joke === "");
    }, [joke]);

    const saveJoke = async () => {
        const auth = getAuth();
        if (auth.currentUser) {
            const db = getFirestore();
            const reference = doc(db, "users", auth.currentUser.uid);
            await updateDoc(reference, {
                jokes: arrayUnion(joke)
            });
            props.navigation.navigate("MyJokes");
            setJoke("");
        } else {
            console.log("no user");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Enter a new joke below:</Text>
            <View style={styles.textAreaContainer}>
                <TextInput
                    style={styles.textArea}
                    underlineColorAndroid='transparent'
                    placeholder='Once upon a time..'
                    placeholderTextColor='gray'
                    numberOfLines={10}
                    multiline={true}
                    onChangeText={(text) => { setJoke(text) }}
                    value={joke}
                />
            </View>

            <Pressable
                style={disabled ? styles.disabledButton : styles.button}
                onPress={() => { saveJoke() }}
                disabled={disabled}
            >
                <Text style={styles.buttonLabel}>Save</Text>
            </Pressable>

            <Pressable
                style={styles.button}
                onPress={() => { props.navigation.navigate("RandomJoke"); }}
            >
                <Text style={styles.buttonLabel}>To random joke</Text>
            </Pressable>
        </View>
    )
};

export default JokeFactory;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    label: {
        marginStart: 20,
        marginTop: 40
    },
    textAreaContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        marginHorizontal: 20,
        marginBottom: 40,
        marginTop: 5
    },
    textArea: {
        height: 150,
        justifyContent: 'flex-start'
    },
    disabledButton: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 40,
        marginBottom: 20,
        backgroundColor: 'lightgray',
        alignItems: 'center'
    },
    button: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 40,
        marginBottom: 20,
        backgroundColor: 'lightgreen',
        alignItems: 'center'
    },
    buttonLabel: {
        padding: 5,
        fontWeight: 'bold',
        fontSize: 16
    },
});

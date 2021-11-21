import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from '../helpers/types';
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import * as React from 'react';
import { useState } from "react";
import { arrayRemove, doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { AntDesign } from '@expo/vector-icons';

const MyJokes: React.FC<NativeStackScreenProps<StackScreens, "MyJokes">> = (props) => {

    const [myJokes, setMyJokes] = useState([]);
    const auth = getAuth();

    useEffect(() => {

        if (auth.currentUser) {
            const db = getFirestore();
            const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
                const data = doc.data();
                if (data) {
                    setMyJokes(data.jokes);
                } else {
                    setMyJokes([]);
                }
            });
        } else {
            console.log("no user");
        }
    }, [])

    const deleteItem = async (joke: string) => {
        
        const db = getFirestore();
        if (auth.currentUser) {
            const docRef = doc(db, "users", auth.currentUser.uid)
            await updateDoc(docRef, {
                jokes: arrayRemove(joke)
            })
        }
    }

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Pressable style={styles.navItem} onPress={() => { props.navigation.navigate("JokeFactory") }}>
                    <Text>New joke</Text>
                </Pressable>
            )
        })
    })
    
    return (
        <View style={styles.container}>

            <FlatList
                data={myJokes}
                renderItem={({ index }) => (
                    <View>
                        <Pressable
                            style={styles.iconContainer}
                            onPress={() => { console.log("press press"); deleteItem(myJokes[index])}}
                        >
                            <AntDesign name="delete" size={16} color="black" />
                        </Pressable>
                        <Text style={styles.listItem} key={index}>{myJokes[index]}</Text>
                    </View>
                )}
                keyExtractor={(item) => item}
            />

            <Pressable
                style={styles.button}
                onPress={() => { props.navigation.navigate("JokeFactory"); }}
            >
                <Text style={styles.buttonLabel}>To the joke factory</Text>
            </Pressable>

        </View>
    )
};

export default MyJokes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    label: {
        fontSize: 18,
        marginHorizontal: 20,
        marginVertical: 10
    },
    listItem: {
        padding: 20,
        fontSize: 14,
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    button: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 40,
        marginVertical: 20,
        backgroundColor: 'lightgreen',
        alignItems: 'center'
    },
    buttonLabel: {
        padding: 5,
        fontWeight: 'bold',
        fontSize: 16
    },
    navItem: {
        paddingEnd: 5
    },
    iconContainer: {
        paddingTop: 5,
        paddingEnd: 10,
        alignItems: 'flex-end',
    }
});

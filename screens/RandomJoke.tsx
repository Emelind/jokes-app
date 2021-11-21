import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Button } from 'react-native';
import { View, Text, StyleSheet, Pressable } from "react-native";
import { StackScreens } from '../helpers/types';
import { AuthContext } from '../src/contexts/AuthContext';
import { tokens } from '../src/translation/appStructure';
import { translate } from '../src/translation/translation';

const RandomJoke: React.FC<NativeStackScreenProps<StackScreens, "RandomJoke">> = (props) => {

    const url = "https://v2.jokeapi.dev/joke/Any?type=single"

    const authContext = useContext(AuthContext)

    const [randomJoke, setRandomJoke] = useState("")

    const fetchData = () => {
        fetch(url).then((response) => {
            return response.json()
        }).then((data) => {
            setRandomJoke(data.joke)
        }).catch((error) => {
            console.log('error', error)
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.jokeContainer}>
                <Text style={styles.jokeText}>{randomJoke}</Text>
            </View>

            <Pressable style={styles.button} onPress={() => fetchData()}>
                <Text style={styles.buttonLabel}>{translate(tokens.screens.randomJoke.JokeButtonText)}</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={() => {authContext?.logout();}}>
                <Text style={styles.buttonLabel}>Logout</Text>
            </Pressable>

            {/*<Pressable style={styles.button} onPress={() => { props.navigation.navigate("JokeFactory"); }}>
                <Text style={styles.buttonLabel}>To the joke factory</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={() => { props.navigation.navigate("MyJokes"); }}>
                <Text style={styles.buttonLabel}>To my jokes</Text>
            </Pressable>*/}
        </View>
    );
}

export default RandomJoke;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    jokeContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        marginHorizontal: 20,
        marginBottom: 40,
        marginTop: 20
    },
    jokeText: {
        height: 300,
        justifyContent: 'flex-start',
        fontSize: 18
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
    }
})
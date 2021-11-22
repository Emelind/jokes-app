import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Controller, FieldValues, SubmitErrorHandler, useForm } from 'react-hook-form';
import { Pressable, StyleSheet } from 'react-native';
import { Button } from 'react-native';
import { View, Text, TextInput } from "react-native";
import { StackScreens } from '../helpers/types';
import { AuthContext } from '../src/contexts/AuthContext';
import { tokens } from '../src/translation/appStructure';
import { translate } from '../src/translation/translation';

const SignIn: React.FC<NativeStackScreenProps<StackScreens, "SignIn">> = (props) => {

    const authContext = useContext(AuthContext);
    const [hidePassword, setHidePassword] = useState(true);
    const toggleHidePassword = () => {
        setHidePassword(!hidePassword)
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(true);

    const hidePasswordText = translate(tokens.screens.signIn.HidePassword)
    const showPasswordText = translate(tokens.screens.signIn.ShowPassword)

    useEffect(() => {
        setDisabled(email.length === 0 || password.length < 6);
    }, [email, password]); 

    return (
        <View style={styles.container}>
            <View style={styles.container}>

                <View style={styles.emailContainer}>
                    <Text style={styles.label}>{translate(tokens.screens.signIn.Email)}</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>

                <View style={styles.passwordContainer}>
                    <Text style={styles.label}>{translate(tokens.screens.signIn.Password)}</Text>
                    <TextInput
                        onChangeText={(text) => setPassword(text)}
                        style={styles.input}
                        secureTextEntry={hidePassword}
                    />
                </View>

                <Pressable style={styles.toggleHidePassword} onPress={() => toggleHidePassword()}>
                    <Text>{hidePassword ? showPasswordText : hidePasswordText}</Text>
                </Pressable>

                <Pressable
                    style={disabled ? styles.disabledButton : styles.button}
                    onPress={() => { authContext?.login(email, password);}}
                    disabled={disabled}
                >
                    <Text style={styles.buttonLabel}>{translate(tokens.screens.signIn.SignInButtonText)}</Text>
                </Pressable>

                <Pressable style={styles.showSignUp} onPress={() => { props.navigation.navigate("SignUp"); }}>
                    <Text>{translate(tokens.screens.signIn.ShowSignUpButtonText)}</Text>
                </Pressable>

            </View>
        </View>
    );
}

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    label: {
        marginBottom: 10
    },
    input: {
        borderWidth: 2,
        borderColor: 'black',
        marginBottom: 10,
        padding: 5,
        borderRadius: 10
    },
    emailContainer: {
        marginTop: 200,
        marginBottom: 20,
        marginHorizontal: 40,
    },
    passwordContainer: {
        marginBottom: 10,
        marginHorizontal: 40,
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
    disabledButton: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 40,
        marginBottom: 20,
        backgroundColor: 'lightgray',
        alignItems: 'center'
    },
    buttonLabel: {
        padding: 5,
        fontWeight: 'bold',
        fontSize: 16
    },
    toggleHidePassword: {
        alignItems: 'center',
        marginBottom: 40
    },
    showSignUp: {
        alignItems: 'center',
    }
})
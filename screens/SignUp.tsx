import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { View, Text, TextInput } from "react-native";
import { StackScreens } from '../helpers/types';
import { AuthContext } from '../src/contexts/AuthContext';
import { tokens } from '../src/translation/appStructure';
import { translate } from '../src/translation/translation';

const SignUp: React.FC<NativeStackScreenProps<StackScreens, "SignUp">> = (props) => {

    const authContext = useContext(AuthContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [disabled, setDisabled] = useState(true);
    useEffect(() => {
        setDisabled(
            //firstName.length === 0 ||
            //lastName.length === 0 ||
            email.length === 0 ||
            password.length === 0 ||
            repeatPassword.length === 0 ||
            password !== repeatPassword
        );
    }, [{/*firstName, lastName*/}, email, password, repeatPassword]);

    return (
        <View style={styles.container}>

            {/*<View>
                <Text style={styles.label}>Firstname</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setFirstName(text)}
                />
            </View>
            <View>
                <Text style={styles.label}>Lastname</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setLastName(text)}
                />
            </View>*/}

            <View style={styles.emailContainer}>
                <Text style={styles.label}>{translate(tokens.screens.signUp.Email)}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>

            <View style={styles.passwordContainer}>
                <Text style={styles.label}>{translate(tokens.screens.signUp.Password)}</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>

            <View style={styles.passwordContainer}>
                <Text style={styles.label}>{translate(tokens.screens.signUp.RepeatPassword)}</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(text) => setRepeatPassword(text)}
                />
            </View>

            <Pressable
                disabled={disabled}
                style={disabled ? styles.disabledButton : styles.button}
                onPress={async () => {
                    authContext?.register(firstName, lastName, email, password);
                    props.navigation.goBack();
                }}>
                <Text style={styles.buttonLabel}>{translate(tokens.screens.signUp.SignUpButtonText)}</Text>
            </Pressable>

            <Pressable style={styles.showSignIn} onPress={() =>  {props.navigation.navigate("SignIn");}}>
                <Text>{translate(tokens.screens.signUp.ShowSignInButtonText)}</Text>
            </Pressable>
        </View>
    );
}

export default SignUp;

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
        marginBottom: 20,
        marginHorizontal: 40,
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
    disabledButton: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 40,
        marginVertical: 20,
        backgroundColor: 'lightgray',
        alignItems: 'center'
    },
    buttonLabel: {
        padding: 5,
        fontWeight: 'bold',
        fontSize: 16
    },
    showSignIn: {
        alignItems: 'center',
    }
})
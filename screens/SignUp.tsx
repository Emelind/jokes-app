import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { useContext } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, SafeAreaView, StyleSheet } from 'react-native';
import { View, Text, TextInput } from "react-native";
import { StackScreens } from '../helpers/types';
import { AuthContext } from '../src/contexts/AuthContext';
import { tokens } from '../src/translation/appStructure';
import { translate } from '../src/translation/translation';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignUp: React.FC<NativeStackScreenProps<StackScreens, "SignUp">> = (props) => {

    const authContext = useContext(AuthContext);

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .label('Email')
            .email('Enter a valid email')
            .required('Please enter your email address'),
        password: Yup.string()
            .label('Password')
            .required('Please enter your password')
            .min(6, 'Password must have at least 6 characters'),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Please repeat password')
    });

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.content}
                >
                    <Formik
                        initialValues={{ email: '', password: '', passwordConfirmation: '' }}
                        onSubmit={values => { 
                            authContext?.register('', '', values.email, values.password);}}
                        validationSchema={validationSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, isSubmitting, touched }) => (

                            <View>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    placeholder={translate(tokens.screens.signUp.Email)}
                                    autoCapitalize='none'
                                />
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorMessage}>{touched.email && errors.email}</Text>
                                </View>

                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    placeholder={translate(tokens.screens.signUp.Password)}
                                    secureTextEntry
                                    autoCapitalize='none'
                                />
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorMessage}>{touched.password && errors.password}</Text>
                                </View>

                                <TextInput
                                    style={styles.input}
                                    onChangeText={handleChange('passwordConfirmation')}
                                    onBlur={handleBlur('passwordConfirmation')}
                                    value={values.passwordConfirmation}
                                    placeholder={translate(tokens.screens.signUp.RepeatPassword)}
                                    secureTextEntry
                                    autoCapitalize='none'
                                />
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorMessage}>{touched.passwordConfirmation && errors.passwordConfirmation}</Text>
                                </View>

                                <Pressable
                                    style={isValid && !isSubmitting ? styles.button : styles.disabledButton}
                                    disabled={!isValid || isSubmitting}
                                    onPress={() => { handleSubmit() }}
                                >
                                    <Text style={styles.buttonLabel}>{translate(tokens.screens.signUp.SignUpButtonText)}</Text>
                                </Pressable>
                            </View>
                        )}
                    </Formik>

                    <Pressable style={styles.showSignIn} onPress={() => { props.navigation.navigate("SignIn"); }}>
                        <Text>{translate(tokens.screens.signUp.ShowSignInButtonText)}</Text>
                    </Pressable>

                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 32,
    },
    safeArea: {
        flex: 1,
    },
    input: {
        borderWidth: 2,
        borderColor: 'black',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    button: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        margin: 40,
        backgroundColor: 'green',
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
        fontSize: 16,
        color: 'white'
    },
    showSignIn: {
        alignItems: 'center',
    },
    errorContainer: {
        paddingHorizontal: 5,
        paddingTop: 5,
        paddingBottom: 15,
    },
    errorMessage: {
        color: 'red'
    }
})
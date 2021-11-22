import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from '../helpers/types';
import { View, Text, Pressable, StyleSheet, TextInput, Button } from "react-native";
import * as React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import { Picker } from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { getAuth } from "firebase/auth";
import { arrayUnion, doc, getFirestore, setDoc, Transaction, updateDoc } from "firebase/firestore";
import { useContext } from "react";
import { ProductContext } from "../src/contexts/ProductContext";
import { translate } from "../src/translation/translation";
import { tokens } from "../src/translation/appStructure";


const EditProduct: React.FC<NativeStackScreenProps<StackScreens, "EditProduct">> = (props) => {

    const context = useContext(ProductContext);

    const [productName, setProductName] = useState(context.product?.productName);
    const [productPrice, setProductPrice] = useState(context.product?.productPrice ?? "");
    const [productType, setProductType] = useState(context.product?.productType);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isPriceValid, setIsPriceValid] = useState(true);

    useEffect(() => {
        if (context.products) {
            for (let i = 0; i < context.products?.length; i++) {
                if (context.products[i].productName === productName) {
                    if (productName === context.product?.productName) {
                        setIsNameValid(true);
                    } else {
                        setIsNameValid(false);
                        return;
                    }
                }
                else {
                    setIsNameValid(true);
                }
            }
        }
    }, [productName]);

    const inRange = () => {
        return parseInt(productPrice) >= 1000 && parseInt(productPrice) <= 2600;
    }

    useEffect(() => {
        if (productType == "integrated") {
            setIsPriceValid(inRange);
        } else {
            setIsPriceValid(true);
        }

    }, [productPrice, productType])

    useEffect(() => {
        setButtonDisabled(
            productName === "" ||
            productPrice === "" ||
            productPrice === "0" ||
            !isNameValid ||
            !isPriceValid
        )
    }, [productName, productPrice, isNameValid, isPriceValid]);

    const editProduct = () => {
        let editedItem = {
            productId: context.product?.productId ?? "",
            productName: productName ?? "",
            productType: productType ?? "",
            productPrice: productPrice ?? ""
        }

        context.editProduct(editedItem);
        props.navigation.navigate("ProductList");
    }

    const removeProduct = () => {
        context.removeProduct();
        props.navigation.navigate("ProductList");
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder={translate(tokens.screens.editProduct.NameInputPlaceholder)}
                placeholderTextColor='gray'
                style={styles.textInput}
                keyboardType='numeric'
                onChangeText={(text) => { setProductName(text) }}
                value={productName}
            />
            {!isNameValid &&
                <View style={styles.errorMessage}>
                    <Text style={styles.errorMessageLabel}>{translate(tokens.screens.editProduct.NameErrorText)}</Text>
                </View>
            }
            <TextInput
                placeholder={translate(tokens.screens.editProduct.PriceInputPlaceholder)}
                placeholderTextColor='gray'
                style={styles.textInput}
                onChangeText={(text) => { setProductPrice(text) }}
                value={productPrice}
            />
            {!isPriceValid &&
                <View style={styles.errorMessage}>
                    <Text style={styles.errorMessageLabel}>{translate(tokens.screens.editProduct.PriceErrorText)}</Text>
                </View>
            }
            <Picker
                selectedValue={productType}
                style={styles.productPicker}
                onValueChange={(itemValue, itemIndex) =>
                    setProductType(itemValue)
                }
            >
                <Picker.Item label="Peripheral" value="peripheral" />
                <Picker.Item label="Integrated" value="integrated" />
            </Picker>

            <View style={styles.buttonContainer}>

                <Pressable
                    style={buttonDisabled ? styles.saveButtonDisabled : styles.saveButton}
                    disabled={buttonDisabled}
                    onPress={() => { editProduct() }}
                >
                    <Text style={styles.saveButtonLabel}>{translate(tokens.screens.editProduct.SaveButtonText)}</Text>
                    <Feather name="download" size={24} color="white" />
                </Pressable>

                <Pressable
                    style={styles.cancelButton}
                    onPress={() => { props.navigation.navigate("ProductList"); }}
                >
                    <Text style={styles.cancelButtonLabel}>{translate(tokens.screens.editProduct.CancelButtontext)}</Text>
                    <Foundation name="prohibited" size={24} color="black" />
                </Pressable>
            </View>

            <Pressable
                style={styles.removeButton}
                onPress={() => { removeProduct() }}
            >
                <Text style={styles.cancelButtonLabel}>{translate(tokens.screens.editProduct.RemoveProductText)}</Text>
            </Pressable>
        </View>
    )
}

export default EditProduct;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 40,
        marginTop: 20,
        paddingStart: 10,
        paddingVertical: 15,
    },
    productPicker: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 40,
        marginVertical: 20,
        paddingStart: 10,
        paddingVertical: 15,
    },
    buttonContainer: {
        width: '80%',
        marginHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    saveButton: {
        backgroundColor: 'green',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '40%'
    },
    saveButtonDisabled: {
        backgroundColor: 'lightgray',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '40%'
    },
    saveButtonLabel: {
        color: 'white',
        fontSize: 16
    },
    cancelButton: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        flexDirection: 'row',
        width: '40%',
        justifyContent: 'space-between'
    },
    cancelButtonLabel: {
        fontSize: 16
    },
    errorMessage: {
        marginHorizontal: 40,
        marginTop: 5
    },
    errorMessageLabel: {
        color: 'red'
    },
    removeButton: {
        backgroundColor: 'red',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        flexDirection: 'row',
        width: '40%',
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 40
    }
})

/*
    const saveProduct = async () => {
        const auth = getAuth();
        if (auth.currentUser) {

            console.log("fix function")
            setProductName("");
            setProductPrice("");

        } else {
            console.log("no user");
        }
    }
*/
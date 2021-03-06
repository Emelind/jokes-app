import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from '../../helpers/types';
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import * as React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import { Picker } from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import uuid from 'react-native-uuid';
import { tokens } from "../translation/appStructure";
import { translate } from "../translation/translation";

const NewProduct: React.FC<NativeStackScreenProps<StackScreens, "NewProduct">> = (props) => {

    const context = useContext(ProductContext);

    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productType, setProductType] = useState("peripheral");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isPriceValid, setIsPriceValid] = useState(true);

    useEffect(() => {
        if (context.products) {
            for (let i = 0; i < context.products?.length; i++) {
                if (context.products[i].productName === productName) {
                    setIsNameValid(false);
                    return;
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
        if(productType == "integrated") {
            setIsPriceValid(inRange);
        } else {
            setIsPriceValid(true);
        }
    }, [productPrice, productType])

    useEffect(() => {
        const isNum = /^\d+$/.test(productPrice);
        setButtonDisabled(
            productName === "" ||
            productPrice === "" ||
            productPrice === "0" ||
            !isNameValid ||
            !isPriceValid ||
            !isNum
        );
    }, [productName, productPrice, isNameValid, isPriceValid]);

    const saveNewProduct = () => {
        const newItem = {
            productId: uuid.v4().toString(),
            productName: productName,
            productType: productType,
            productPrice: productPrice
        }
        context.addProduct(newItem);
        props.navigation.navigate("ProductList");
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder={translate(tokens.screens.newProduct.NameInputPlaceholder)}
                placeholderTextColor='gray'
                style={styles.textInput}
                keyboardType='numeric'
                onChangeText={(text) => { setProductName(text); }}
                value={productName}  
            />
            {!isNameValid && 
                <View style={styles.errorMessage}>
                    <Text style={styles.errorMessageLabel}>{translate(tokens.screens.newProduct.NameErrorText)}</Text>
                </View>
            }
            <TextInput
                placeholder={translate(tokens.screens.newProduct.PriceInputPlaceholder)}
                placeholderTextColor='gray'
                style={styles.textInput}
                onChangeText={(text) => { setProductPrice(text) }}
                value={productPrice}
            />
            {!isPriceValid && 
                <View style={styles.errorMessage}>
                    <Text style={styles.errorMessageLabel}>{translate(tokens.screens.newProduct.PriceErrorText)}</Text>
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
                    onPress={() => { saveNewProduct() }}
                >
                    <Text style={styles.saveButtonLabel}>{translate(tokens.screens.newProduct.SaveButtonText)}</Text>
                    <Feather name="download" size={24} color="white" />
                </Pressable>

                <Pressable
                    style={styles.cancelButton}
                    onPress={() => { props.navigation.navigate("ProductList"); }}
                >
                    <Text style={styles.cancelButtonLabel}>{translate(tokens.screens.newProduct.CancelButtontext)}</Text>
                    <Foundation name="prohibited" size={24} color="black" />
                </Pressable>
            </View>
        </View>
    )
}
export default NewProduct;

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
    }
});
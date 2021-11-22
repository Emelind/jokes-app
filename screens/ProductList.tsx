import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from '../helpers/types';
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import * as React from 'react';
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { doc, Firestore, getFirestore, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import { FAB } from 'react-native-paper';
import { useContext } from "react";
import { ProductContext } from "../src/contexts/ProductContext";
import { translate } from "../src/translation/translation";
import { tokens } from "../src/translation/appStructure";

const ProductList: React.FC<NativeStackScreenProps<StackScreens, "ProductList">> = (props) => {

    const context = useContext(ProductContext);

    const headerComponent = () => (
        <View style={styles.listHeaderContainer}>
            <Text style={styles.leftHeaderItem}>{translate(tokens.screens.productList.HeaderName)}</Text>
            <Text style={styles.centerHeaderItem}>{translate(tokens.screens.productList.HeaderType)}</Text>
            <Text style={styles.rightHeaderItem}>{translate(tokens.screens.productList.HeaderPrice)}</Text>
        </View>
    )

    const emptyComponent = () => (
        <Text style={styles.emptyLabel}>{translate(tokens.screens.productList.EmptyListText)}</Text>
    )

    return (
        <View style={styles.container}>
            <FlatList
                style={{width: "100%"}}
                data={context.products}
                renderItem={({item, index}) => (
                    <Pressable 
                        style={styles.listItemContainer}
                        onPress={() => {context.setProduct(item); props.navigation.navigate("EditProduct")}}
                    >
                        <Text style={styles.leftItem}>{item.productName}</Text>
                        <Text style={styles.centerItem}>{item.productType}</Text>
                        <Text style={styles.rightItem}>{item.productPrice}</Text>
                    </Pressable>
                )}
                keyExtractor={item => item.productId}
                ListEmptyComponent={emptyComponent}
                ListHeaderComponent={headerComponent}
            />
            <FAB
                style={styles.fabSmile}
                small
                icon="emoticon-happy"
                onPress={() => { props.navigation.navigate("RandomJoke") }}
            />
            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={() => { props.navigation.navigate("NewProduct") }}
            />
        </View>
    )
}

export default ProductList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItem: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    fab: {
        position: 'absolute',
        backgroundColor: 'green',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    fabSmile: {
        position: 'absolute',
        backgroundColor: 'green',
        margin: 16,
        right: 50,
        bottom: 0,
    },
    emptyLabel: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
        marginHorizontal: 60,
        marginVertical: '50%'
    },
    listHeaderContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        padding: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 5
    },
    leftHeaderItem: {
        fontWeight: 'bold'
    },
    centerHeaderItem: {
        fontWeight: 'bold'
    },
    rightHeaderItem: {
        fontWeight: 'bold'
    },
    listItemContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#000",
        backgroundColor: "#ebf0ee",
        margin: 3,
        padding: 10,
        borderRadius: 5,
        justifyContent: "space-between",
      },
      leftItem: {
        width: "33%",
        textAlign: "left",
      },
      centerItem: {
        width: "33%",
        textAlign: "center",
      },
      rightItem: {
        width: "33%",
        textAlign: "right",
      },
})


    //const auth = getAuth();
    // const [products, setProducts] = useState([]);
    /*useEffect(() => {
        if (auth.currentUser) {
            const db = getFirestore();
            const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (doc) => {
                const data = doc.data()
                console.log("data", data)
                if (data) {
                    const prod = data.products
                    console.log("prod: ", prod)
                }
            });
        } else {
            console.log("no user");
        }
    }, [])*/
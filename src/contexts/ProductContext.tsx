import * as React from 'react';
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { arrayRemove, arrayUnion, doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";

interface IProductContext {
	product?: IProduct;
	setProduct: (product: IProduct) => void;
	products?: IProduct[];
	setProducts: (products: IProduct[]) => void;
	removeProduct: (item: IProduct) => void;
	addProduct: (item: IProduct) => void;
	editProduct: (item: IProduct) => void;
}

interface IProduct {
	productId: string,
	productName: string,
	productType: string,
	productPrice: string
}

export const ProductContext = React.createContext<IProductContext>({
	product: undefined,
	setProduct: () => { },
	products: [],
	setProducts: () => { },
    removeProduct: () => { },
	addProduct: () => { },
	editProduct: () => { }
});

const initialState: IProduct[] = [];

export const ProductContextProvider: React.FC = (props) => {

	const [products, setProducts] = useState<IProduct[]>(initialState);
	const [product, setProduct] = useState<IProduct>()

	const removeProduct = async (item: IProduct) => {
		//setProducts((products) => products.filter((productToRemove) => productToRemove.productId !== item.productId));

		const auth = getAuth();
		if (auth.currentUser) {
			const db = getFirestore();
			const reference = doc(db, "users", auth.currentUser.uid);
			await updateDoc(reference, {
				products: arrayRemove(item)
			});
		} else {
			console.log("no user");
		}
	}

	const addProduct = async (item: IProduct) => {
		//setProducts((products) => [...products, item])

		const auth = getAuth();
		if (auth.currentUser) {
			const db = getFirestore();
			const reference = doc(db, "users", auth.currentUser.uid);
			await updateDoc(reference, {
				products: arrayUnion({
					productId: item.productId,
					productName: item.productName,
					productPrice: item.productPrice,
					productType: item.productType
				})
			});
		} else {
			console.log("no user");
		}
	}

	const editProduct = async (item: IProduct) => {
		const newArray = [...products];
		for(let i = 0; i < newArray.length; i++) {
			if(newArray[i].productId === item.productId){
				newArray[i].productName = item.productName
				newArray[i].productPrice = item.productPrice
				newArray[i].productType = item.productType
			}
		}
		//setProducts(newArray);
		
		const auth = getAuth();
		if (auth.currentUser) {
			const db = getFirestore();
			const reference = doc(db, "users", auth.currentUser.uid);
			await updateDoc(reference, {
				products: newArray
			});
		} else {
			console.log("no user");
		}
	}

	return (
		<ProductContext.Provider
			value={{ product, setProduct, products, setProducts, removeProduct, addProduct, editProduct }}>
			{props.children}
		</ProductContext.Provider>
	);
};
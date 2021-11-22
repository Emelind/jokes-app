import * as React from 'react';
import { useState } from "react";

interface IProductContext {
	product?: IProduct;
	setProduct: (product: IProduct) => void;
	products?: IProduct[];
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
    removeProduct: () => { },
	addProduct: () => { },
	editProduct: () => { }
});

const initialState: IProduct[] = [{
	productId: "1",
	productName: "Product 1",
	productType: "peripheral",
	productPrice: "700"
},
{
	productId: "2",
	productName: "Product 2",
	productType: "integrated",
	productPrice: "1000"
},
{
	productId: "3",
	productName: "Product 3",
	productType: "peripheral",
	productPrice: "5500"
}]

export const ProductContextProvider: React.FC = (props) => {

	const [products, setProducts] = useState<IProduct[]>(initialState);
	const [product, setProduct] = useState<IProduct>()

	const removeProduct = (item: IProduct) => {
		setProducts((products) => products.filter((productToRemove) => productToRemove.productId !== item.productId));
	}

	const addProduct = (item: IProduct) => {
		setProducts((products) => [...products, item])
	}

	const editProduct = (item: IProduct) => {
		const newArray = [...products];
		for(let i = 0; i < newArray.length; i++) {
			if(newArray[i].productId === item.productId){
				newArray[i].productName = item.productName
				newArray[i].productPrice = item.productPrice
				newArray[i].productType = item.productType
			}
		}
		setProducts(newArray);
	}

	return (
		<ProductContext.Provider
			value={{ product, setProduct, products, removeProduct, addProduct, editProduct }}>
			{props.children}
		</ProductContext.Provider>
	);
};
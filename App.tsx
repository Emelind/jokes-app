import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext, AuthContextProvider } from './src/contexts/AuthContext';
import * as React from 'react';
import { useContext } from 'react';
import RandomJoke from './screens/RandomJoke';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import { StackScreens } from './helpers/types';
import JokeFactory from './screens/JokeFactory';
import MyJokes from './screens/MyJokes';
import ProductList from './screens/ProductList';
import NewProduct from './screens/NewProduct';
import EditProduct from './screens/EditProduct';
import { ProductContextProvider } from './src/contexts/ProductContext';
import { tokens } from "./src/translation/appStructure";
import { setI18nConfig, translate } from "./src/translation/translation";
import { initializeApp } from 'firebase/app';
import { initFirebase } from './firebase';
import { getAuth } from 'firebase/auth';
import { arrayUnion, doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect } from 'react';

export default function App() {

	setI18nConfig();

	return (
		<AuthContextProvider>
			<ProductContextProvider>
				<MainNavigator />
			</ProductContextProvider>
		</AuthContextProvider>
	);
}

export const MainNavigator = () => {

	const Stack = createNativeStackNavigator<StackScreens>();
	const authContext = useContext(AuthContext);

	const signInTitle = translate(tokens.screens.mainNavigator.TitleSignIn)
	const signUpTitle = translate(tokens.screens.mainNavigator.TitleSignUp)
	const productListTitle = translate(tokens.screens.mainNavigator.TitleProductList)
	const editProductTitle = translate(tokens.screens.mainNavigator.TitleEditProduct)
	const newProductTitle = translate(tokens.screens.mainNavigator.TitleNewProduct)	
	const randomJokeTitle = translate(tokens.screens.mainNavigator.TitleRandomJoke)

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{!authContext?.isUserSignedIn && (
					<>
						<Stack.Screen name="SignIn" component={SignIn} options={{title: signInTitle}}/>
						<Stack.Screen name="SignUp" component={SignUp} options={{title: signUpTitle}}/>
					</>
				)}
				{authContext?.isUserSignedIn && (
					<>
						<Stack.Screen name="ProductList" component={ProductList} options={{title: productListTitle}}/>
						<Stack.Screen name="EditProduct" component={EditProduct} options={{title: editProductTitle}}/>
						<Stack.Screen name="NewProduct" component={NewProduct} options={{title: newProductTitle}} />
						<Stack.Screen name="RandomJoke" component={RandomJoke} options={{title: randomJokeTitle}}/>
						
						<Stack.Screen name="JokeFactory" component={JokeFactory} />
						<Stack.Screen name="MyJokes" component={MyJokes} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
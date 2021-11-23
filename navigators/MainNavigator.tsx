import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext, AuthContextProvider } from '../src/contexts/AuthContext';
import * as React from 'react';
import { useContext } from 'react';
import RandomJoke from '../screens/RandomJoke';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import { StackScreens } from '../helpers/types';
import ProductList from '../screens/ProductList';
import NewProduct from '../screens/NewProduct';
import EditProduct from '../screens/EditProduct';
import { ProductContextProvider } from '../src/contexts/ProductContext';
import { tokens } from "../src/translation/appStructure";
import { setI18nConfig, translate } from "../src/translation/translation";

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
						<Stack.Screen name="SignIn" component={SignIn} options={{title: signInTitle, headerTitleAlign: 'center'}}/>
						<Stack.Screen name="SignUp" component={SignUp} options={{title: signUpTitle, headerTitleAlign: 'center'}}/>
					</>
				)}
				{authContext?.isUserSignedIn && (
					<>
						<Stack.Screen name="ProductList" component={ProductList} options={{title: productListTitle, headerTitleAlign: 'center'}}/>
						<Stack.Screen name="EditProduct" component={EditProduct} options={{title: editProductTitle, headerTitleAlign: 'center'}}/>
						<Stack.Screen name="NewProduct" component={NewProduct} options={{title: newProductTitle, headerTitleAlign: 'center'}} />
						<Stack.Screen name="RandomJoke" component={RandomJoke} options={{title: randomJokeTitle, headerTitleAlign: 'center'}}/>
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
import { AuthContextProvider } from './src/contexts/AuthContext';
import * as React from 'react';
import { ProductContextProvider } from './src/contexts/ProductContext';
import { setI18nConfig} from "./src/translation/translation";
import { MainNavigator } from './src/navigators/MainNavigator';

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
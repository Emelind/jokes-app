enum MainNavigator {
    TitleSignIn= 'title-sign-in',
    TitleSignUp= 'title-sign-up',
    TitleProductList= 'title-products',
    TitleEditProduct= 'title-edit-product',
    TitleNewProduct= 'title-new-product',
    TitleRandomJoke= 'title-random-joke'
}

enum SignIn {
    Email= 'email',
    Password= 'password',
    ShowPassword= 'show-password',
    HidePassword= 'hide-password',
    SignInButtonText= 'sign-in-button-text',
    ShowSignUpButtonText= 'show-sign-up-button-text'
}

enum SignUp {
    Email= 'email',
    Password= 'password',
    RepeatPassword= 'repeat-password',
    SignUpButtonText= 'sign-up-button-text',
    ShowSignInButtonText= 'show-sign-in-button-text'
}

enum ProductList {
    HeaderName= 'header-name',
    HeaderPrice= 'header-price',
    HeaderType= 'header-type',
    EmptyListText= 'empty-list-text'
}

enum EditProduct {
    NameInputPlaceholder= 'name-input-placeholder',
    NameErrorText= 'name-error-text',
    PriceInputPlaceholder= 'price-input-placeholder',
    PriceErrorText= 'price-error-text',
    SaveButtonText= 'save-button-text',
    CancelButtontext= 'cancel-button-text',
    RemoveProductText= 'remove-product-text'
}

enum NewProduct {
    NameInputPlaceholder= 'name-input-placeholder',
    NameErrorText= 'name-error-text',
    PriceInputPlaceholder= 'price-input-placeholder',
    PriceErrorText= 'price-error-text',
    SaveButtonText= 'save-button-text',
    CancelButtontext= 'cancel-button-text',
}

enum RandomJoke {
    JokeButtonText = 'joke-button-text'
}

export const tokens = {
    screens: {
        mainNavigator: MainNavigator, 
        signIn: SignIn,
        signUp: SignUp,
        productList: ProductList,
        editProduct: EditProduct,
        newProduct: NewProduct,
        randomJoke: RandomJoke
    },
};
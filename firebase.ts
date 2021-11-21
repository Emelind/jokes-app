import { FirebaseApp, initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateCurrentUser,
  User,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjPvEJDqZciprl98CNAsChnJ1pJneYvBM",
  authDomain: "jokes-app-b063b.firebaseapp.com",
  projectId: "jokes-app-b063b",
  storageBucket: "jokes-app-b063b.appspot.com",
  messagingSenderId: "465196706242",
  appId: "1:465196706242:web:37bf7d7731c0ddb8ba0e5b",
  measurementId: "G-LBRSV6YHJ1"
};

// Initialize Firebase
let app: FirebaseApp;

export const initFirebase = (callback: (_: boolean) => void) => {
  app = initializeApp(firebaseConfig);
  const auth = getAuth();
  auth.onAuthStateChanged((state) => {
    if (state) {
      callback(true); //current user signed in
    } else {
      callback(false); //current user NOT signed in
    }
  });
};

export const fbRegister = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<UserCredential> => {
  const auth = getAuth(app);

  const createUserResponse = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  if (auth.currentUser) {
    const db = getFirestore();
    const reference = doc(db, "users", auth.currentUser.uid)
    await setDoc(reference, { "jokes": [] }, { merge: true })
} else {
    console.log("no user")
}

  /*const newUser: User = {
    ...createUserResponse.user,
    displayName: firstName + " " + lastName,
  };
  newUser.email;
  await updateCurrentUser(auth, newUser);*/
  return createUserResponse;
};

export const fbLogout = async () => {
  const auth = getAuth(app);
  await auth.signOut();
};

export const fbLogin = async (email: string, password: string): Promise<UserCredential | undefined> => {

  const auth = getAuth(app);

  try {
    const credentualUser = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return credentualUser;
  } catch (error) {
    return undefined;
  }
};
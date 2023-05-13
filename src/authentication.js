import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
//import { getAnalytics } from "firebase/analytics";

// FIrebase Config from your firebase project.
const firebaseConfig = {
  apiKey: "AIzaSyBkyh6YyhdGo3boP2hgGRc2-JfKMZbLTFc",
  authDomain: "maplateditorauth.firebaseapp.com",
  projectId: "maplateditorauth",
  storageBucket: "maplateditorauth.appspot.com",
  messagingSenderId: "390483794970",
  appId: "1:390483794970:web:103e70fa3490e9948e85a3",
  measurementId: "G-SK5S19ZF33"
};

const app = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = app.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const useCurrentUser = (props) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  return [user, loading, error];
};

const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);

    const user = res.user;
    console.log("user > ", user);
    // Save user to DB here
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    console.log("email > ", email);
    console.log("REACT_APP_API_URL > ", process.env.REACT_APP_API_URL);

    const res = await auth.signInWithEmailAndPassword(email, password);
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    console.log("user > ", user);
    // Save User to DB here.
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const logout = () => {
  console.log("logout");
  auth.signOut();
};

export {
  auth,
  useCurrentUser,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};

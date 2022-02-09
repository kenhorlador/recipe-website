import firebase from 'firebase/app'
import 'firebase/firestore'

// Config
const firebaseConfig = {
  apiKey: "AIzaSyDv0kgvr7X5m_6ySdLgUFselG9XtZ10QTg",
  authDomain: "cooking-recipe-site-5c6e5.firebaseapp.com",
  projectId: "cooking-recipe-site-5c6e5",
  storageBucket: "cooking-recipe-site-5c6e5.appspot.com",
  messagingSenderId: "849883531886",
  appId: "1:849883531886:web:67c82df3d638d660a2b47f"
};

// initialize firebase
firebase.initializeApp(firebaseConfig)

// initialize services
export const projectFirestore = firebase.firestore()

export default firebase

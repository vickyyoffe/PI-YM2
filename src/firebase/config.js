import app from 'firebase/app' //sale de la app de firebase
import firebase from 'firebase' 

const firebaseConfig = {
    apiKey: "AIzaSyD-hCfnWmzL4BdLvl9zJTm95wuxhJXdiJ0",
    authDomain: "pi-ym-3c8e1.firebaseapp.com",
    projectId: "pi-ym-3c8e1",
    storageBucket: "pi-ym-3c8e1.firebasestorage.app",
    messagingSenderId: "864029037048",
    appId: "1:864029037048:web:ae70124f904855229e460d"
  };

  app.initializeApp(firebaseConfig) 

  export const auth = firebase.auth()
  export const storage = app.storage()
  export const db = app.firestore()
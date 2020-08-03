import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyDT6RIuQSmgOfsN-Hf-G3Wpm4zbhtMbR68",
    authDomain: "photowall-e218d.firebaseapp.com",
    databaseURL: "https://photowall-e218d.firebaseio.com",
    projectId: "photowall-e218d",
    storageBucket: "photowall-e218d.appspot.com",
    messagingSenderId: "453158225943",
    appId: "1:453158225943:web:18d3d2c78d2c7c017a7452",
    measurementId: "G-4S4ZQNPGB0"
  };

firebase.initializeApp(firebaseConfig)

const database = firebase.database()

export {database}
import * as firebase from 'firebase'

let configFirebase = {
  apiKey: "AIzaSyBgsHd1nOMPng--Kw8Aj2hO6qD0D4ekEws",
  authDomain: "testing-app-fc213.firebaseapp.com",
  databaseURL: "https://testing-app-fc213.firebaseio.com",
  projectId: "testing-app-fc213",
  storageBucket: "testing-app-fc213.appspot.com",
  messagingSenderId: "187892633827"
}


let firebaseApp = firebase.initializeApp(configFirebase)

export const firebaseDB = firebaseApp.database()
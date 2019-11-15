import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAon3R6_03iV8DSD4x_zfF3KxdSAPdb1J8",
  authDomain: "tanya-kabar.firebaseapp.com",
  databaseURL: "https://tanya-kabar.firebaseio.com",
  projectId: "tanya-kabar",
  storageBucket: '',
  messagingSenderId: "149857011071",
  appId: "1:149857011071:web:4b13d57dc32dac0a0f464a"
};

// Initialize Firebase
let app = null;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

export const Db = app.database();
export const Auth = app.auth();
export const Fbs = firebase;
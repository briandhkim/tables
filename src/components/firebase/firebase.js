// import firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCbA4WSuCQToy1IMsEyVPC_xGn0A-k-UFk",
    authDomain: "emptable-46b17.firebaseapp.com",
    databaseURL: "https://emptable-46b17.firebaseio.com",
    projectId: "emptable-46b17",
    storageBucket: "emptable-46b17.appspot.com",
	messagingSenderId: "706342177570"
}

firebase.initializeApp(config);
export default firebase;
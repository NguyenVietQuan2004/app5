import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
const firebaseConfig = {
    apiKey: 'AIzaSyBnpiyT8H-ehyulmgG3_59Y5NqotVsbj1Y',
    authDomain: 'chat-realtime-7044a.firebaseapp.com',
    projectId: 'chat-realtime-7044a',
    storageBucket: 'chat-realtime-7044a.appspot.com',
    messagingSenderId: '505886571681',
    appId: '1:505886571681:web:8ba3ebdd0e0871f1e984e0',
    measurementId: 'G-T8D42GHDWS',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
// auth.useEmulator('http://localhost:9099');
// if (window.location.hostname === 'localhost') {
//     db.useEmulator('localhost', '8080');
// }
export { auth, db };
export default firebase;

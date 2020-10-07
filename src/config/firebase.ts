import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyD_92tt3fZ7UA01NIK_GHY7M3uf7uL8Lyg',
  authDomain: 'gcac-da8ca.firebaseapp.com',
  databaseURL: 'https://gcac-da8ca.firebaseio.com',
  projectId: 'gcac-da8ca',
  storageBucket: 'gcac-da8ca.appspot.com',
  messagingSenderId: '507962699415',
  appId: '1:507962699415:web:6aba508869eb7da59343d2',
  measurementId: 'G-X3T4EQDR1R',
};

const database = firebase.initializeApp(config);
export default database.database().ref();

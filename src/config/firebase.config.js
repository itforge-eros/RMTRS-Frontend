import Firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDJe5jrnIxP3D2fqY0F8ViiIKb3cOie1P8',
  authDomain: 'try-firebase-41a7b.firebaseapp.com',
  databaseURL: 'https://try-firebase-41a7b.firebaseio.com',
  projectId: 'try-firebase-41a7b',
  storageBucket: 'try-firebase-41a7b.appspot.com',
  messagingSenderId: '88663101633'
}
const firebaseApp = Firebase.initializeApp(config)

export const db = firebaseApp.database()

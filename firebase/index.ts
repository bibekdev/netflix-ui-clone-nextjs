// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBAE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBAE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBAE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBAE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBAE_APP_ID,
}

// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }

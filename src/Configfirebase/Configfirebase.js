import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { getFirestore } from 'firebase/firestore'

import { getAuth } from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCmF84JtjH4a9FHm-LZ6ecOvdt1FikaitE",
  authDomain: "ecormece-e8991.firebaseapp.com",
  projectId: "ecormece-e8991",
  storageBucket: "ecormece-e8991.appspot.com",
  messagingSenderId: "371801896729",
  appId: "1:371801896729:web:b7480d44b73226c54df788",
  measurementId: "G-YS35D9GDH4"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const analytics = getAnalytics(app);

export const db = getFirestore(app)



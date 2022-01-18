import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMcBN-0VdOv5gkWsdwbXVo1NCrZuWVWDc",
  authDomain: "house-marketplace-app-a0896.firebaseapp.com",
  projectId: "house-marketplace-app-a0896",
  storageBucket: "house-marketplace-app-a0896.appspot.com",
  messagingSenderId: "199652806695",
  appId: "1:199652806695:web:9a143a0e4dfbda94867e02",
  measurementId: "G-QVC95JD1JT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const db = getFirestore();

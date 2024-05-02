import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBxauBjllPyR4bGs7PoE4zohFwWnpNV2pg",
  authDomain: "shopplus-c48d2.firebaseapp.com",
  projectId: "shopplus-c48d2",
  storageBucket: "shopplus-c48d2.appspot.com",
  messagingSenderId: "230995266074",
  appId: "1:230995266074:web:932f1b47ebf8ce3e1f5fa3"
};

export const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)
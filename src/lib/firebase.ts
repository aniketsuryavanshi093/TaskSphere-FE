import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBi8mj19dspP4kqHMcUhud-lceJKC2or5I',
  authDomain: 'signalchat-50b47.firebaseapp.com',
  projectId: 'signalchat-50b47',
  storageBucket: 'signalchat-50b47.appspot.com',
  messagingSenderId: '1029382044183',
  appId: '1:1029382044183:web:7113cb6a7780ea54ba3a52',
  measurementId: 'G-EETYRF2XWC'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };

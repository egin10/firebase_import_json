const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
require("dotenv").config();
const data = require("./data.json");

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyCrgD2cmF9zVXLvtuTcUZvv5fbmYYc6nR8",
  authDomain: "quiz-app-c8a4f.firebaseapp.com",
  projectId: "quiz-app-c8a4f",
  storageBucket: "quiz-app-c8a4f.appspot.com",
  messagingSenderId: "590275545476",
  appId: "1:590275545476:web:1b34bd3eb793bba7b775d1",
  measurementId: "G-6VYB189Y6B",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const importJSON = async () => {
  for await (const quiz of data) {
    // insert correct answer
    quiz.incorrect_answers.push(quiz.correct_answer);
    // shuffle answer
    quiz.incorrect_answers = shuffle(quiz.incorrect_answers);

    // insert to Firestore
    db.collection("quiz").doc().set(quiz);
  }

  console.log(data.length);
  console.log("Done🚀");
};

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

importJSON();

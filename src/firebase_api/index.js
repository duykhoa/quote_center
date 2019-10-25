import * as firebase from "firebase";

const GetQuotes = (options = {}, callback) => {
  // Initialize Firebase
  const env = process.env;
  const apiKey = env.REACT_APP_API_KEY;
  const authDomain = env.REACT_APP_AUTH_DOMAIN;
  const databaseUrl = env.REACT_APP_DATABASE_URL;
  const projectId = env.REACT_APP_PROJECT_ID;
  const storageBucket = env.REACT_APP_STORAGE_BUCKET;
  const messagingSenderId = env.REACT_APP_MESSAGING_SENDER_ID;

  var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  };

  firebase.initializeApp(config);
  firebase.database()
    .ref("/quotes")
    .on("value", snap => {
      callback(snap.val())
    });
};

export {
  GetQuotes
};

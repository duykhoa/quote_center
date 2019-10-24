import * as firebase from "firebase";

const GetQuotes = (options = {}, callback) => {
  // Initialize Firebase
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

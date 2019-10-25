import * as firebase from "firebase";
import { openDB } from 'idb';

const getQuotes = async (options = {}, callback) => {
  const db = (await indexedDB());
  const ttl = 3600000;
  const lastUpdate = await db.get('quote', 'lastUpdate');

  if (lastUpdate && (Date.now() - new Date(lastUpdate) > ttl)) {
    initFireBase();

    firebase.database()
      .ref('/quotes')
      .on('value', async (snap) => {
        const db = (await indexedDB());

        db.put('quote', snap.val(), "quotes");
        db.put('quote', new Date().valueOf(), "lastUpdate");
        callback(snap.val());
      });
  } else {
    const quotes = await db.get('quote', 'quotes');
    callback(quotes);
  }
};

const initFireBase = (options) => {
  const env = process.env;
  const apiKey = env.REACT_APP_API_KEY;
  const authDomain = env.REACT_APP_AUTH_DOMAIN;
  const databaseURL = env.REACT_APP_DATABASE_URL;
  const projectId = env.REACT_APP_PROJECT_ID;
  const storageBucket = env.REACT_APP_STORAGE_BUCKET;
  const messagingSenderId = env.REACT_APP_MESSAGING_SENDER_ID;

  var config = {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId
  };

  return firebase.initializeApp(config);
}

const indexedDB = () => {
  return openDB('QuoteCenter', 1, {
    upgrade(db) {
      db.createObjectStore('quote');
    }
  });
}

export {
  initFireBase,
  getQuotes
};

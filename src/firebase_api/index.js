import firebase from 'firebase/app';
import 'firebase/database';

import { openDB } from 'idb';

const getQuotes = async (options = {}, callback) => {
  const db = await indexedDB();
  const ttl = 86400000;
  const lastUpdate = await db.get('quote', 'lastUpdate');

  if (isExpiredCache(lastUpdate, ttl)) {
    await initFireBase();

    firebase.database()
      .ref('/quotes')
      .on('value', async (snap) => {
        let result = await snap.val();

        if (result) {
          const db = await indexedDB();
          db.put('quote', result, "quotes");
          db.put('quote', new Date().valueOf(), "lastUpdate");
          callback(result);
        }
      });
  } else {
    const quotes = await db.get('quote', 'quotes');
    callback(quotes);
  }
};

const initFireBase = (options) => {
  const apiKey            = process.env.REACT_APP_API_KEY;
  const authDomain        = process.env.REACT_APP_AUTH_DOMAIN;
  const databaseURL       = process.env.REACT_APP_DATABASE_URL;
  const projectId         = process.env.REACT_APP_PROJECT_ID;
  const storageBucket     = process.env.REACT_APP_STORAGE_BUCKET;
  const messagingSenderId = process.env.REACT_APP_MESSAGING_SENDER_ID;

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

const isExpiredCache = (lastUpdate, ttl) => {
  let now = Date.now();
  return !lastUpdate || (now - new Date(lastUpdate) > ttl);
}

export {
  initFireBase,
  getQuotes
};

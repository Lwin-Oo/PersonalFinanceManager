import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get transactions from database
async function getCities(db) {
  const transactionsCol = collection(db, 'transactions');
  const transactionsSnapshot = await getDocs(citiesCol);
  const transactionsList = transactionsSnapshot.docs.map(doc => doc.data());
  return transactionsList;
}
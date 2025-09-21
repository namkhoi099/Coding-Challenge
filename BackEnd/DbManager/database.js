const { initializeApp } = require('firebase/app');
const { getFirestore, doc, deleteDoc, setDoc, collection, query, getDocs, getDoc, addDoc } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyDstlopKoiGrkXPoInqiG9PvE7RtX72puY",
    authDomain: "coding-challenge-68800.firebaseapp.com",
    projectId: "coding-challenge-68800",
    storageBucket: "coding-challenge-68800.firebasestorage.app",
    messagingSenderId: "718401125475",
    appId: "1:718401125475:web:2a1d25c10ecf3caccb4c56"
};

let app;
let firestore;

const initializeFirebaseApp = () => {
    try {
        app = initializeApp(firebaseConfig);
        firestore = getFirestore();
        return app;
    } catch (error) {

    }
}

const findDoc = async (coll, docRef) => {
    try {
        if(!docRef)
            return null;
        const document = doc(firestore, coll, docRef);
        const docSnap = await getDoc(document);
        if (docSnap.exists())
            return { _id: docSnap.id, ...docSnap.data() };
        return null;
    } catch (error) {
        console.log(error);
        throw error
    }
}
const findOne = async (coll, cond) => {
    try {
        const collectionRef = collection(firestore, coll);
        let q;
        if (cond)
            q = query(collectionRef, cond);
        else
            q = query(collectionRef);

        const docSnap = await getDocs(q);
        let data = [];
        docSnap.forEach((d) => {
            data.push({ _id: d.id, ...d.data() });
        })
        return data[0];
    } catch (error) {
        throw error
        console.log(error);
    }
}
const findAll = async (coll, cond, ord) => {
    try {
        const collectionRef = collection(firestore, coll);
        let q;
        if (cond)
            q = query(collectionRef, cond);
        else if (ord)
            q = query(collectionRef, ord);
        else if (cond && ord)
            q = query(collectionRef, cond, ord);
        else
            q = query(collectionRef)

        const docSnap = await getDocs(q);
        let data = [];
        docSnap.forEach((d) => {
            data.push({ _id: d.id, ...d.data() });
        })
        return data;
    } catch (error) {
        throw error
        console.log(error);
    }
}
const insert = async (coll, data) => {
    try {
        const collectionRef = collection(firestore, coll);
        let dataInserted = await addDoc(collectionRef, data);
        return dataInserted;
    } catch (error) {
        throw error
        console.log(error);
    }
}

const update = async (coll, docRef, data) => {
    try {
        const document = doc(firestore, coll, docRef);
        let dataUpdated = await setDoc(document, data);
        return dataUpdated;
    } catch (error) {
        throw error
        console.log(error);
    }
}

const deleteById = async (coll, id) => {
    try {
        const docRef = doc(firestore, coll, id);
        await deleteDoc(docRef);
    } catch (error) {
        throw error
        console.log(error);
    }
}

const getFirebaseApp = () => app;

module.exports = { initializeFirebaseApp, getFirebaseApp, findAll, findOne, findDoc, insert, update, deleteById };
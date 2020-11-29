import firebaseAdmin from '../../config/fireAdmin-config';

const fetchUser = async (uid) => {
    const userDocument = await firebaseAdmin.firestore().collection("users").doc(uid).get();
    return userDocument.data();
}

export { fetchUser }
import firebaseAdmin from '../../config/FirebaseAdminConfig';

const fetchUser = async (uid) => {
    const userDocument = await firebaseAdmin.firestore().collection("users").doc(uid).get();
    return userDocument.data();
}

// const fetchPerm = async (uid) => {
//     const userDocument = await firebaseAdmin.firestore().collection("users").doc(uid).get();
//     return userDocument.data().permissions;
// }

export { fetchUser }
import firebaseAdmin from '../../../config/FirebaseAdminConfig';

export const fetchUserWithUID = async (uid) => {
    const userDocument = await firebaseAdmin.firestore().collection("users").doc(uid).get();
    return userDocument.data();
}

export default async (req, res) => {
  if (req.method === "GET"){
    const {
      query: { uid },
    } = req;

    res.statusCode = 200;
    res.json(await fetchUserWithUID(uid));
  }

}

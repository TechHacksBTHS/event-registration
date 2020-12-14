import firebaseAdmin from '../../../config/FirebaseAdminConfig';

export const fetchSignUpsWithUID = async (uid) => {
    const snapshot = await firebaseAdmin.firestore().collection("formResponses").get();
    return snapshot.docs.map(doc => doc.data());
}

export default async (req, res) => {
  if (req.method === "GET"){
    const {
      query: { uid },
    } = req;

    res.statusCode = 200;
    res.json(await fetchSignUpsWithUID(uid));
  }
}

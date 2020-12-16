import firebaseAdmin from '../../../config/FirebaseAdminConfig';

export const fetchSignUpsWithUID = async (uid) => {
    const snapshot = await firebaseAdmin.firestore().collection("formResponses").get();
    return Promise.all(snapshot.docs.map(async doc => {
      if (doc.data().eventID === uid){
        if (doc.data().userRef != null){
          const userDoc = await doc.data().userRef.get();
          return {
            uid: doc.id,
            eventID: doc.data().eventID,
            user: {
              name: userDoc.data().name,
              email: userDoc.data().email,
              permissions: userDoc.data().permissions
            }
          }
        }

        return {
          uid: doc.id,
          eventID: doc.data().eventID,
          user: {
            name: doc.data().firstName + " " + doc.data().lastName,
            email: doc.data().email,
            // permissions: "participant"
          }
        }
      }
    }));
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

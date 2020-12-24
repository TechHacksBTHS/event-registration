import firebaseAdmin from '../../../config/FirebaseAdminConfig';
import { fetchUserWithUID } from '../fetch_user/[uid]';
import { parseCookies } from 'nookies';

const participantData = async (doc, userData) => {
  if (doc.data().userRef != null){
    const userDoc = await doc.data().userRef.get();
    if (userDoc.data().email === userData.email){
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
  }
}

const adminData = async (doc) => {
  if (doc.data().userRef == null){
    return {
      uid: doc.id,
      eventID: doc.data().eventID,
      user: {
        name: doc.data().firstName + " " + doc.data().lastName,
        email: doc.data().email,
        // permissions: "participant"
      }
    }
  } else {
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
}

export const fetchSignUpsWithUID = async (uid, userData) => {
    const snapshot = await firebaseAdmin.firestore().collection("formResponses").get();

    const result = Promise.all(snapshot.docs.map(async doc => {
      if (doc.data().eventID === uid){
        if(userData.permissions === "admin"){
          return adminData(doc);
        } else {
          return participantData(doc, userData);
        }
      }
    }));

    const filterd = (await result).filter((item) => {
      return item != null;
    });

    return filterd;
}

export default async (req, res) => {
  if (req.method === "GET"){
    const {
      query: { uid },
    } = req;

    try {
      const cookies = parseCookies({ req });
      const verifiedToken = await firebaseAdmin.auth().verifyIdToken(cookies.token);
      const userData = await fetchUserWithUID(verifiedToken.uid);

      res.statusCode = 200;
      res.json(await fetchSignUpsWithUID(uid, userData));

    } catch(err) {
      res.statusCode = 200;
      res.json([]);
    }
  }
}

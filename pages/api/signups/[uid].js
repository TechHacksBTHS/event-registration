import firebaseAdmin from '../../../config/FirebaseAdminConfig';
import { fetchUserWithUID } from '../fetch_user/[uid]';
import { parseCookies } from 'nookies';

const getUserData = async (req) => {
    const cookies = parseCookies({ req });
    const verifiedToken = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    return await fetchUserWithUID(verifiedToken.uid);
}

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
      firstName: doc.data().firstName,
      lastName: doc.data().lastName,
      schoolName: doc.data().schoolName,
      gradeLevel: doc.data().gradeLevel,
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
        firstName: doc.data().firstName,
        lastName: doc.data().lastName,
        schoolName: doc.data().schoolName,
        gradeLevel: doc.data().gradeLevel,
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
  const {
    query: { uid },
  } = req;

  if (req.method === "GET"){ //GET REQUEST
    try {
      const userData = await getUserData(req);

      res.statusCode = 200;
      res.json(await fetchSignUpsWithUID(uid, userData));

    } catch(err) {
      res.statusCode = 200;
      res.json([]);
    }
  } else if (req.method === "DELETE"){ //DELETE REQUEST
    try {
      const userData = await getUserData(req);

      if (userData.permissions === "admin"){
        await firebaseAdmin.firestore().collection("formResponses").doc(uid).delete();
        res.statusCode = 200;
        res.json("success");
      } else {
        res.statusCode = 401;
      }
    } catch(err) {
      console.log(err);
      res.statusCode = 401;
    }
  }
}

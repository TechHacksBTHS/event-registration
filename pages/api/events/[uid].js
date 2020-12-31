import firebaseAdmin from '../../../config/FirebaseAdminConfig';
import { fetchUserWithUID } from '../fetch_user/[uid]';
import { parseCookies } from 'nookies';

export const fetchEventWithUID = async (req, uid) => {
  const eventDocument = await firebaseAdmin.firestore().collection("events").doc(uid).get();

  if ((await getUserData(req)).permissions === "admin"){
    return eventDocument.data();
  } else {
    console.log("Insufficient permission to see the whole doc.");
    return {
      name: eventDocument.data().name,
      type: eventDocument.data().type,
      description: eventDocument.data().description,
      date: eventDocument.data().date,
      iconURL: eventDocument.data().iconURL
    }
  }
}

const getUserData = async (req) => {
  const cookies = parseCookies({ req });
  const verifiedToken = await firebaseAdmin.auth().verifyIdToken(cookies.token);
  return await fetchUserWithUID(verifiedToken.uid);
}

const updateEvent = async (data, uid) => {
  data.date = new firebaseAdmin.firestore.Timestamp(data.date.seconds, data.date.nanoseconds);
  firebaseAdmin.firestore().collection("events").doc(uid).update({
    ...data,
  });
};

export default async (req, res) => {
  const {
    query: { uid },
  } = req;

  switch(req.method){
    case "GET":
      res.statusCode = 200;
      res.json(await fetchEventWithUID(req, uid));
      break;
    case "PUT":
      try {
        const userData = await getUserData(req);
        if (userData.permissions === "admin"){
          await updateEvent(req.body, uid);

          res.statusCode = 200;
          res.json({});
        } else {
          res.statusCode = 401;
          res.json({});
        }
      } catch {
        res.statusCode = 401;
        res.json({});
      }
  }
}
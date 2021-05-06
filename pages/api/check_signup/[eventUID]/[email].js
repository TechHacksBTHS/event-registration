import firebaseAdmin from "../../../../config/FirebaseAdminConfig";

export default async function handler(req, res) {
    const {
      query: { eventUID, email },
    } = req

    const snapshot = await firebaseAdmin.firestore().collection("formResponses").get();

    //Return success if the selected event has a submission with target email

    let hasSubmission = false;

    snapshot.docs.forEach(doc => {
        if (doc.data().eventID == eventUID && doc.data().email == email){
          hasSubmission = true;
        }
    });
    
    res.statusCode = 200;
    if (hasSubmission){
      res.json({
        "status": "success",
        "data": true,
        "message": null
      });
    } else {
      res.json({
        "status": "success",
        "data": false,
        "message": "Response does not exist!"
      });
    }
    
  }
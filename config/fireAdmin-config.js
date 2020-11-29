import firebaseAdmin from 'firebase-admin';

import serviceAccount from '../FirebaseAdminSecrets.json';

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id,
    }),
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  });
}

export default firebaseAdmin;
import Fire from "../../config/fire-config";

const provider = new Fire.auth.GoogleAuthProvider();

const signInWithGoogleOAuth = async () => {
    const result = await Fire.auth().signInWithPopup(provider);
    await createUser(result);
}

const signOut = async () => {
    await Fire.auth().signOut();
}

const createUser = async (result) => {

    //Temporary (needs to be modified)
    let accountPermission = "participant";
    if (result.user.email === "hteng4250@bths.edu"){
        accountPermission = "admin";
    }

    //Adding the user content to the users collection
    await Fire.firestore().collection("users").doc(result.user.uid).set({
        "email": result.user.email,
        "name": result.user.displayName,
        "permissions": accountPermission
    });
}

export { signInWithGoogleOAuth, signOut }
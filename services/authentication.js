import Fire from "../config/fire-config";

const provider = new Fire.auth.GoogleAuthProvider();

const signInWithGoogleOAuth = () => {
    Fire.auth().signInWithPopup(provider).then((result) => {
        // const token = result.credential.accessToken;
        const user = result.user;
        console.log(user);
    }).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
    });
}

export {signInWithGoogleOAuth}

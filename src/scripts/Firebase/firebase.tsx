import * as firebase from "firebase/app";
import "firebase/firestore";
import config from "./config";

let firestore : firebase.firestore.Firestore|undefined = undefined;

export const init = () => {
    if (firestore === undefined) {
        const app: firebase.app.App= firebase.initializeApp(config);
        const firestore = firebase.firestore(app);
        const settings = {timestampsInSnapshots: true};
        firestore.settings(settings);
    }
    return firestore;
}
export default firebase;
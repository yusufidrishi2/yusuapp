import { init } from "./firebase";


export default class Firebase {
    private _docRef: any = undefined;

constructor() {
    this._docRef = init()!.collection("tasks").doc('data');
}

}

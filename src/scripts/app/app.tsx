/**
 * @file This File house the EntryPoint of this application viz, App
 */

/**
 * Necessary imports of the packages
 */
import { MyOwnTSX } from '../utils/myowntsx'
import * as React from 'react'
import * as $ from 'jquery'
//import * as firebase from "firebase/app";
// import '../app/firebase.js'
import 'firebase/auth';
import 'firebase/database';
import '../app/firebase.js'

/**
 * @class which executes at the begining of the app  
 */
class App {

    private _upstreamData: any = undefined;
    private _docRef: any = undefined;


    /**
     * @public @constructor to initiate the application to start
     */
    public constructor () {
        // this.loader();
        //this._docRef = this.initializeFirebase();
        this.start();
    }

    /**
     * @private @function start to show the UI
     */
    private start() {
        new Promise((resolve, reject) => {
            try {
                resolve(this._docRef.set(this._upstreamData));
            } catch(err) {
                reject(err);
            }
        })
        .then((data) => {
            this._upstreamData = JSON.parse(data as any);
            console.log('Success');
            this.check();
            this.events(this);
        })
        .catch((err) => {
            console.log(err);
            this.check();
            this.events(this);
        });
    }

    // private initializeFirebase() {
    //     let fireapp = firebase.initializeApp({
    //         apiKey: "AIzaSyBAPGIGvT0b8lxtzuzN7t2hF9eNcpFm6Ww",
    //         authDomain: "yusuapp-a2f26.firebaseapp.com",
    //         databaseURL: "https://yusuapp-a2f26.firebaseio.com",
    //         projectId: "yusuapp-a2f26",
    //         storageBucket: "yusuapp-a2f26.appspot.com",
    //         messagingSenderId: "362158389535",
    //         appId: "1:362158389535:web:dfe4ba03c6e88e947d582a",
    //         measurementId: "G-WDWSG3LZT4"
    //     });
    //     let firestore = firebase.firestore(fireapp);
    //     return firestore.collection("tasks").doc('data');
    // }

    private loader() {
        let doc: HTMLElement|null = document.getElementById('body');
        let view = (
            <div style={MyOwnTSX.getCSSProp("position: absolute; vertical-align: middle; width: 50%; text-align: center")}>
                <div style={MyOwnTSX.getCSSProp("position: relative; text-align: inline")}>
                    <p><b>Enter your name:</b></p>
                    <input type="text" id="username" style={MyOwnTSX.getCSSProp("position: relative; width: 80%; margin-bootom: 10px")} />
                </div>
                <br></br>
                <button id="signup" style={MyOwnTSX.getCSSProp("position: relative; width: 10%; margin-left: 10px; margin-bottom: -5px")}>Sign Up</button>
            </div>
        );
        MyOwnTSX.renderUI(view, doc);
    }

    private check() {
        let username = localStorage.getItem("username");
        if (username) {
            this.logIn();
        } else {
            this.signUp();   
        }
    }

    private signUp() {
        let doc: HTMLElement|null = document.getElementById('body');
        let view = (
            <div style={MyOwnTSX.getCSSProp("position: absolute; vertical-align: middle; width: 50%; text-align: center")}>
                <div style={MyOwnTSX.getCSSProp("position: relative; text-align: inline")}>
                    <p><b>Enter your name:</b></p>
                    <input type="text" id="username" style={MyOwnTSX.getCSSProp("position: relative; width: 80%; margin-bootom: 10px")} />
                </div>
                <br></br>
                <button id="signup" style={MyOwnTSX.getCSSProp("position: relative; width: 10%; margin-left: 10px; margin-bottom: -5px")}>Sign Up</button>
            </div>
        );
        MyOwnTSX.renderUI(view, doc); 
    }

    private logIn() {
        let doc: HTMLElement|null = document.getElementById('body');
        let view = (
            <div style={MyOwnTSX.getCSSProp("position: absolute; bottom: 10px; width: 99%; text-align: center")}>
                <input type="text" id="message" style={MyOwnTSX.getCSSProp("position: relative; width: 80%; margin-bootom: 10px")} />
                <button id="send" style={MyOwnTSX.getCSSProp("position: relative; width: 10%; margin-left: 10px; margin-bottom: -5px")}>Send</button>
            </div>
        );
        MyOwnTSX.renderUI(view, doc);
    }

    private events (curApp: App) {
        $('#send').on('click', function () {
            let message = $('#message').val() as string;
            let username = localStorage.getItem("username") as string;
            curApp._upstreamData[username] = message;
            curApp.writeFile(curApp._upstreamData);
        });
        $('#signup').on('click', function () {
            let username = $('#username').val() as string;
            if (curApp._upstreamData.username.hasOwnProperty(username)) {
                alert("username exists!! Retry with different user name :)")
            } else {
                localStorage.setItem("username", username)
                curApp._upstreamData.username[username] = true;
                curApp.writeFile(curApp._upstreamData);
            }
        });
    }

    private writeFile(data: any) {
        new Promise((resolve, reject) => {
            try {
                resolve(this._docRef.set(this._upstreamData));
            } catch(err) {
                reject(err);
            }
        })
        .then((data) => {
            this._upstreamData = JSON.parse(data as any);
            console.log('Success');
            this.check();
            this.events(this);
        })
        .catch((err) => {
            console.log(err);
            this.check();
            this.events(this);
        });
    }
}

/**
 * Initialization of the class App and starting the application
 */
new App();

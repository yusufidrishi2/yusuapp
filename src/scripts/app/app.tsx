/**
 * @file This File house the EntryPoint of this application viz, App
 */

/**
 * Necessary imports of the packages
 */
import { MyOwnTSX } from '../utils/myowntsx'
import * as React from 'react'
import * as $ from 'jquery'

/**
 * @class which executes at the begining of the app  
 */
class App {

    private _upstreamData: any = undefined;

    /**
     * @public @constructor to initiate the application to start
     */
    public constructor () {
        this.start();
    }

    /**
     * @private @function start to show the UI
     */
    private start() {
        this.readFile();
    }

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
        
    }

    private readFile() {
        
    }
}

/**
 * Initialization of the class App and starting the application
 */
new App();

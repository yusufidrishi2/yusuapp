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

    private _upstreamData: {[key: string]: {password: string, chats: Array<{}>}} = {};

    private shouldRenderingStop: boolean = true;

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
        this.pullChatsFromUpstream()
            .then((rawData) => {
                console.log('rawData = ', rawData);
                let data = rawData as Array<UpstreamDataFormat>;
                data.forEach((eachUser) => {
                    let name = eachUser.userName.substr(0, eachUser.userName.indexOf('_'));
                        let pass =  eachUser.userName.substr(eachUser.userName.indexOf('_')+1);
                        this._upstreamData[name] = {
                            password: pass,
                            chats: eachUser.userChats 
                        }
                })
                this.renderHeading();
                this.check();
                console.log('upstreamData = ', this._upstreamData)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    private renderHeading() {
        let doc: HTMLElement|null = document.getElementById('chatApplication');
        let view = (
            <>
                <div id="heading" style={MyOwnTSX.getCSSProp("text-align: center; margin-top: -10px")}>
                    <h1>WELCOME TO YUSUAPP</h1>
                </div>
                <div id="chatContent">
                </div>
            </>    
        );
        MyOwnTSX.renderUI(view, doc); 
    }

    private check() {
        let username = localStorage.getItem("username");
        if (username && this._upstreamData[username]) {
            this.typingBody();
            $('#message').val("Type your message here...")
            this.shouldRenderingStop = false;
            this.chatBody(0);
        } else {
            this.signUp();   
        }
    }

    private signUp() {
        let doc: HTMLElement|null = document.getElementById('chatContent');
        let view = (
            <div style={MyOwnTSX.getCSSProp("text-align: center; margin-top: 150px")}>
                <div>
                    <p style={MyOwnTSX.getCSSProp("display: inline-block")}><b>Enter username:</b></p>
                    <input type="text" id="username" style={MyOwnTSX.getCSSProp("display: inline-block; margin-left: 10px; width:30%")} />
                </div>
                <br></br>
                <div>
                    <p style={MyOwnTSX.getCSSProp("display: inline-block")}><b>Enter password:</b></p>
                    <input type="text" id="password" style={MyOwnTSX.getCSSProp("display: inline-block; margin-left: 10px; width:30%")} />
                </div>
                <br></br>
                <button id="signup" onClick={() => this.signUpEvent(this)} style={MyOwnTSX.getCSSProp("width: 20%")}>Sign Up</button>
            </div>
        );
        MyOwnTSX.renderUI(view, doc); 
    }

    private isValidUserName(userName: string): boolean {
        let prohibited = ['_', ' '];
        for (let i = 0; i < prohibited.length; i++) {
            if (userName.indexOf(prohibited[i]) > -1) {
                return false;
            }
        }
        return true;
    }

    private signUpEvent(curApp: App) {
        let username = $('#username').val() as string;
        let pass = $('#password').val() as string;
        if (curApp._upstreamData.hasOwnProperty(username) && curApp._upstreamData[username].password != pass) {
            alert("Password mismatched!!! Either choose new username or give correct password");
        } else if (pass == ""){
            alert("Password can not be left blanked!!");
        } else if (curApp.isValidUserName(username) == false) {
            alert("Username should not contain any underscore or space!!");
        } else {
            curApp._upstreamData[username] = {
                                              password: pass,
                                              chats: []
                                            }
            localStorage.setItem("username", username);
            curApp.pushChatsToUpstream({userName: username+'_'+pass, userChats: {}});
            curApp.typingBody();
            $('#message').val("Type your message here...")
            this.shouldRenderingStop = false;
            curApp.chatBody(0);
        }
    }

    private typingBody() {
        let doc: HTMLElement|null = document.getElementById('chatContent');
        let view = (
            <>  
                <div>
                    <div id="loginInfo">
                        <p style={MyOwnTSX.getCSSProp("display: inline-block")}><b>Login as: </b>{String(localStorage.getItem("username"))}</p>
                        <button id="logout" onClick={() => this.logoutEvent(this)}  style={MyOwnTSX.getCSSProp("display: inline-block; float: right; width: 18%; margin-top:15px")}>LogOut</button>
                    </div>
                </div>
                <div id="chatbody" style={MyOwnTSX.getCSSProp("max-height:430px; overflow-y: scroll")}>
                </div>
                <div style={MyOwnTSX.getCSSProp("text-align: center; margin-top: 20px")}>
                    <input type="text" id="message" onClick={() => this.messageClickEvent(this)} style={MyOwnTSX.getCSSProp("float: left; width: 76%; margin-left: 10px")}/>
                    <button id="send" onClick={() => this.sendEvent(this)} style={MyOwnTSX.getCSSProp("float: right; width: 18%")}>Send</button>
                </div>
            </>
        );
        MyOwnTSX.renderUI(view, doc);
    }

    private messageClickEvent(curApp: App) {
        $('#message').val("")
    }

    private logoutEvent(curApp: App) {
        localStorage.clear();
        this.shouldRenderingStop = true;
        curApp.signUp();
    }

    private updateScroll() {
        var element = document.getElementById("chatbody");
        element!.scrollTop = element!.scrollHeight;
    }

    private chatBody(curNumberOfChats: number) {
        new Promise((resolve, reject) => {
            this.pullChatsFromUpstream()
                .then((rawData) => {
                    let data = rawData as Array<UpstreamDataFormat>;
                    let prepareChat: Array<{name: string, chat: string, timeStamp: number}> = []
                    data.forEach((eachUser) => {
                        let userName = eachUser.userName.substr(0, eachUser.userName.indexOf('_'));
                        let userPass =  eachUser.userName.substr(eachUser.userName.indexOf('_')+1);
                        this._upstreamData[name] = {
                            password: userPass,
                            chats: eachUser.userChats 
                        }
                        eachUser.userChats.forEach((ele) => {
                            if (ele.chats) { 
                                prepareChat.push({
                                    name: userName,
                                    chat: ele.chats,
                                    timeStamp: ele.timeStamp
                                })
                            }
                        })                                                                                   
                    })
                    prepareChat.sort((a, b) => {
                        return a.timeStamp - b.timeStamp;
                    });
                    console.log('preparechat = ', prepareChat)
                    if (prepareChat.length > curNumberOfChats) {
                        curNumberOfChats = prepareChat.length;
                        let doc: HTMLElement|null = document.getElementById('chatbody');
                        prepareChat.map((eachChat) => {
                            console.log(eachChat.name, ':', eachChat.chat)
                        })
                        let allChatRenders: Array<JSX.Element> = [];
                        prepareChat.forEach((eachChat, index) => {
                            let curUserName = localStorage.getItem("username") as string;
                            if (eachChat.name == curUserName) {
                                allChatRenders.push(
                                    <div key={Date.now()}>
                                        <p key={Date.now()} style={MyOwnTSX.getCSSProp("text-align: right; margin-right:10px")}><b>{eachChat.name}:</b> {eachChat.chat}</p>
                                    </div>
                                )
                            } else {
                                allChatRenders.push(
                                    <div key={Date.now()}>
                                        <p key={Date.now()} style={MyOwnTSX.getCSSProp("text-align: left")}><b>{eachChat.name}:</b> {eachChat.chat}</p>
                                    </div>
                                )
                            }
                        })
                        let view = (
                            <>
                                {allChatRenders}
                            </>
                        )
                        MyOwnTSX.renderUI(view, doc);
                        this.updateScroll();
                    }
                    if (this.shouldRenderingStop) {
                        return;
                    } else {
                        setTimeout(() => {
                            this.chatBody(curNumberOfChats)
                        }, 2000)
                    }
                    
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    }

    private sendEvent(curApp: App) {
        let message = $('#message').val() as string;
        $('#message').val("Type your message here...");
        let username = localStorage.getItem("username") as string;
        curApp._upstreamData[username].chats.push({chats: message, timeStamp: Date.now()});
        curApp.pushChatsToUpstream({userName: username+'_'+curApp._upstreamData[username].password, userChats: {chats: message, timeStamp: Date.now()}});
    }

    private pushChatsToUpstream(data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: (window as any).__env.LOAD_CHATS_API,
                type: "POST",
                data: JSON.stringify(data),
                dataType: "json",
                crossDomain: true,
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    resolve(res);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    }

    private pullChatsFromUpstream(): Promise<any> {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: (window as any).__env.LOAD_CHATS_API,
                type: "POST",
                data: JSON.stringify({userName: "all"}),
                dataType: "json",
                crossDomain: true,
                contentType: "application/json; charset=utf-8",
                success: function (res) {
                    resolve(res);
                },
                error: function (error) {
                    reject(error);
                }
            });
        });
    }
}

export interface UserChatArray {
    timeStamp: number, 
    chats: string
}

export interface UpstreamDataFormat {
    userName: string, 
    userChats: UserChatArray[]
}

/**
 * Initialization of the class App and starting the application
 */
new App();

/**
 * @file This File house the EntryPoint of this application viz, App
 */

/**
 * Necessary imports of the packages
 */
import { MyOwnTSX } from '../utils/myowntsx'
import * as React from 'react'
import * as $ from 'jquery'
import * as appStyles from './app.module.css'

/**
 * @class which executes at the begining of the app  
 */
class App {

    private _upstreamData: {[key: string]: {password: string, chats: Array<{}>}} = {};

    private _shouldRenderingStop: boolean = true;

    private _cyphering: Array<{encryption: string, decryption: string}> = [];

    /**
     * @public @constructor to initiate the application to start
     */
    public constructor () {
        this._cyphering.push({encryption: "%31982", decryption: "'"});
        this.start();
    }

    /**
     * @private @function start to show the UI
     */
    private start() {
        this.pullChatsFromUpstream()
            .then((rawData) => {
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
            })
            .catch((error) => {
                console.log(error)
            })
    }

    private renderHeading() {
        let doc: HTMLElement|null = document.getElementById('chatApplication');
        let view = (
            <>
                <div className={appStyles.heading}>
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
            this._shouldRenderingStop = false;
            this.chatBody(0);
        } else {
            this.signUp();   
        }
    }

    private signUp() {
        let doc: HTMLElement|null = document.getElementById('chatContent');
        let view = (
            <div className={appStyles.divSignUp}>
                <div>
                    <p className={appStyles.paraSignUp}><b>Enter username:</b></p>
                    <input type="text" id="username" className={appStyles.inputSignUp} />
                </div>
                <br></br>
                <div>
                    <p className={appStyles.paraSignUp}><b>Enter password:</b></p>
                    <input type="text" id="password" className={appStyles.inputSignUp} />
                </div>
                <br></br>
                <button id="signup" onClick={() => this.signUpEvent(this)} className={appStyles.buttonSignUp}>Sign Up</button>
            </div>
        );
        MyOwnTSX.renderUI(view, doc); 
    }

    private isValidUserName(userName: string): boolean {
        let prohibited = ['_', ' '];
        if (userName.length > 7) {
            return false;
        }
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
        } else if (pass == "" || username == ""){
            alert("Password can not be left blanked!!");
        } else if (curApp.isValidUserName(username) == false) {
            alert("Username should not contain any underscore or space and it should be under 7 characters!!");
        } else {
            curApp._upstreamData[username] = {
                                              password: pass,
                                              chats: []
                                            }
            localStorage.setItem("username", username);
            curApp.pushChatsToUpstream({userName: username+'_'+pass, userChats: {}});
            curApp.typingBody();
            this._shouldRenderingStop = false;
            curApp.chatBody(0);
        }
    }

    private typingBody() {
        let doc: HTMLElement|null = document.getElementById('chatContent');
        let view = (
            <>  
                <div id="loginInfo">
                    <p className={appStyles.loginAs}><b>Login as: </b>{String(localStorage.getItem("username"))}</p>
                    <button id="logout" onClick={() => this.logoutEvent(this)}  className={appStyles.buttonLogout}>LogOut</button>
                </div>
                <div id="chatbody" style={MyOwnTSX.getCSSProp("height:"+String(screen.height-200)+"px")} className={appStyles.divChatBody}>
                </div>
                <div className={appStyles.divMessage}>
                    <textarea id="message" onClick={() => this.messageClickEvent(this)} className={appStyles.inputText} rows={1} cols={50} placeholder="Type your message here..."></textarea>
                    <button id="send" onClick={() => this.sendEvent(this)}  className={appStyles.buttonSend}>Send</button>
                </div>
            </>
        );
        MyOwnTSX.renderUI(view, doc);
    }

    private messageClickEvent(curApp: App) {

    }

    private logoutEvent(curApp: App) {
        localStorage.clear();
        this._shouldRenderingStop = true;
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
                    if (prepareChat.length > curNumberOfChats) {
                        curNumberOfChats = prepareChat.length;
                        let doc: HTMLElement|null = document.getElementById('chatbody');
                        let allChatRenders: Array<JSX.Element> = [];
                        prepareChat.forEach((eachChat, index) => {
                            let curUserName = localStorage.getItem("username") as string;
                            let val = {margin: ""};
                            eachChat.chat = this.decryption(eachChat.chat);
                            if (eachChat.name == curUserName) {
                                if ((eachChat.name.length+eachChat.chat.length)*12 > screen.width) {
                                    val.margin = "20%";
                                } else {
                                    let space = screen.width-((eachChat.name.length+eachChat.chat.length+12)*8);
                                    val.margin = space+"px";
                                }
                                allChatRenders.push(
                                    <div key={eachChat.timeStamp} style={MyOwnTSX.getCSSProp("margin-left:"+val.margin)} className={appStyles.divRightChat}>
                                        <p key={eachChat.timeStamp+1} className={appStyles.paraRightChat}><b>{eachChat.name}:</b>&nbsp;{eachChat.chat}</p>
                                    </div>
                                )
                            } else {
                                if ((eachChat.name.length+eachChat.chat.length)*12 > screen.width) {
                                    val.margin = "20%";
                                } else {
                                    let space = screen.width-((eachChat.name.length+eachChat.chat.length+12)*8);
                                    val.margin = space+"px";
                                }
                                allChatRenders.push(
                                    <div key={eachChat.timeStamp} style={MyOwnTSX.getCSSProp("margin-right:"+val.margin)} className={appStyles.divLeftChat}>
                                        <p key={eachChat.timeStamp+1} className={appStyles.paraLeftChat}><b>{eachChat.name}:</b>&nbsp;{eachChat.chat}</p>
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
                    if (this._shouldRenderingStop) {
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

    private encryption(curApp:App, rawMessage: string): string {
        let encryptedMessage = rawMessage;
        curApp._cyphering.forEach((ele) => {
            encryptedMessage = encryptedMessage.split(ele.decryption).join(ele.encryption);
        })
        return encryptedMessage;
    }

    private decryption(rawMessage: string): string {
        let decryptedMessage = rawMessage;
        this._cyphering.forEach((ele) => {
            decryptedMessage = decryptedMessage.split(ele.encryption).join(ele.decryption);
        })
        return decryptedMessage;
    }

    private sendEvent(curApp: App) {
        let rawMessage = ($('#message').val() as string).trim();
        let message = curApp.encryption(curApp, rawMessage);
        $('#message').val("");
        if (message) {
            let username = localStorage.getItem("username") as string;
            curApp._upstreamData[username].chats.push({chats: message, timeStamp: Date.now()});
            curApp.pushChatsToUpstream({userName: username+'_'+curApp._upstreamData[username].password, userChats: {chats: message, timeStamp: Date.now()}});
        }
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

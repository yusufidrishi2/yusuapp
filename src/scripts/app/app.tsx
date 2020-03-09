/**
 * @file This File house the EntryPoint of this application viz, App
 */

/**
 * Necessary imports of the packages
 */
import { MyOwnTSX } from '../utils/myowntsx'
import * as React from 'react'

/**
 * @class which executes at the begining of the app  
 */
class App {

    /**
     * @public @constructor to initiate the application to start
     */
    public constructor () {
        this.start()
    }

    /**
     * @private @function start to show the UI
     */
    private start() {
        let doc: HTMLElement = document.body.appendChild(document.createElement("DIV"));
        let view: JSX.Element = (
            <div className="asd">
                <h1 id="asdasd  ">TESTING</h1>
            </div>
        );
        MyOwnTSX.renderUI(view, doc);
    }
}

/**
 * Initialization of the class App and starting the application
 */
new App();

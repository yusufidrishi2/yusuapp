/**
 * @file This File is responsible for rendering the elements in the targeted DOM
 */

 /**
  * Necessary imports of the packages
  */
import * as ReactDOM from 'react-dom'
import * as React from 'react'
import { MyOwnString } from '../utils/myownstring'

/**
 * @class ReactComponent @extends  React.Component to convert JSX element into react object
 */
export class ReactComponent extends React.Component<{element: JSX.Element}> {

    /**
     * @function render to take in props and state, and render HTML
     */
    render() {
        return (
            this.props.element
        );
    }
}

/**
 * @class which is responisible to handle React Component class
 */
export class MyOwnTSX {

    /**
     * @static @function renderUI to render the UI by using React JS
     * @param view JSX.Element which gives the what to render
     * @param doc HTMLElement targets where to render
     */
    static renderUI(view: JSX.Element, doc: HTMLElement|null) {
        ReactDOM.render(<ReactComponent element={view} />, doc);
    }

    static getCSSProp(data: string): React.CSSProperties {
        let y: any = {}
        data.split(";").forEach(eles => {
            let s = eles.split(":")
            if (s[0].indexOf('-') != -1) {
                s[0] = MyOwnString.replaceAt(s[0], s[0].indexOf('-'), s[0].indexOf('-')+1, s[0][s[0].indexOf('-')+1].toUpperCase());
            }
            y[s[0].trim()] = s[1].trim()
        })
        return (y as React.CSSProperties)
    }
}
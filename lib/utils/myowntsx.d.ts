/**
 * @file This File is responsible for rendering the elements in the targeted DOM
 */
import * as React from 'react';
/**
 * @class ReactComponent @extends  React.Component to convert JSX element into react object
 */
export declare class ReactComponent extends React.Component<{
    element: JSX.Element;
}> {
    /**
     * @function render to take in props and state, and render HTML
     */
    render(): JSX.Element;
}
/**
 * @class which is responisible to handle React Component class
 */
export declare class MyOwnTSX {
    /**
     * @static @function renderUI to render the UI by using React JS
     * @param view JSX.Element which gives the what to render
     * @param doc HTMLElement targets where to render
     */
    static renderUI(view: JSX.Element, doc: HTMLElement): void;
    static getCSSProp(data: string): React.CSSProperties;
}

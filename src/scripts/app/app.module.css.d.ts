declare namespace AppModuleCssModule {
  export interface IAppModuleCss {
    buttonLogout: string;
    buttonSend: string;
    buttonSignUp: string;
    divChatBody: string;
    divLeftChat: string;
    divMessage: string;
    divRightChat: string;
    divSignUp: string;
    heading: string;
    inputSignUp: string;
    inputText: string;
    loginAs: string;
    paraLeftChat: string;
    paraRightChat: string;
    paraSignUp: string;
  }
}

declare const AppModuleCssModule: AppModuleCssModule.IAppModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AppModuleCssModule.IAppModuleCss;
};

export = AppModuleCssModule;

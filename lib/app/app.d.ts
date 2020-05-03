/**
 * @file This File house the EntryPoint of this application viz, App
 */
export interface UserChatArray {
    timeStamp: number;
    chats: string;
}
export interface UpstreamDataFormat {
    userName: string;
    userChats: UserChatArray[];
}

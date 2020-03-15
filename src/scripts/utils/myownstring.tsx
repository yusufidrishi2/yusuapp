export class MyOwnString {
    static replaceAt(str: string, index1: number, index2: number, replacement: String) {
        return str.substr(0, index1) + replacement + str.substr(index2 + replacement.length);
    }
}
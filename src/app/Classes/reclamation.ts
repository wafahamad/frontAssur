import { Navigant } from "./navigant";

export class Reclamation {
    constructor(
        public num: number,
        public contenu: string,
        public lue:boolean,
        public navigantId:number,
        public navigant:Navigant){}
}

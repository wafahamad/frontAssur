import { Bulletin } from "./bulletin";

export class BordereauGAT {
    constructor(
        public idB: number,
        public  type_act: string,
        public montant_act_dep: number,
        public montant_act_rembor: number,
        public bulletinNum:number,
        public bulletin:Bulletin

    ){}
}

import { Bulletin } from "./bulletin";

export class DetailDepense {
    constructor(
        public  idD: number,
        public  type_act: string,
        public  montant_act_dep: number,
        public bulletin:Bulletin
    ){}
}

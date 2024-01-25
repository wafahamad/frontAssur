import { BordereauGAT } from "./bordereau-gat";
import { DetailDepense } from "./detail-depense";
import { Navigant } from "./navigant";

export class Bulletin {
    constructor(
        public  numBs: number,
        public  malade: string,
        public  dateSoin: Date,
        public montantDepense: number,
        public dateEnvoiGAT: Date,
        public  dateRem: Date,
        public  montantRemborse: number,
        public  status: string,
        public navigantId : number,
        public navigant:Navigant,
        public detailDepenses?: DetailDepense[],
        public bordereauGATs?: BordereauGAT[],
        

    ){}
   
}

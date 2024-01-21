import { Bulletin } from "./bulletin";
import { NavigEnfant } from "./navig-enfant";
import { Reclamation } from "./reclamation";

export class Navigant {
    constructor( public matricule: number,
        public nom: string,
        public dateNaissance: Date,
        public numCompte: number,
        public motPasse: string,
        public fonction: string,
        public marie: boolean,
        public  nomConjoint: string,
      
        public  bulletins?: Bulletin[],
        public  navigEnfants?: NavigEnfant[],
        public reclamations?: Reclamation[],){}
}

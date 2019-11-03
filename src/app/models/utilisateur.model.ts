import { OeuvrePanier } from './oeuvre.panier.model';

export class Utilisateur {
    id: string;
    uid: string;
    displayName: string;
    email: string;
    tel: string;
    pays: string;
    ville: string;
    adresse: string;
    devise: string;
    panier: Array<OeuvrePanier>;

    constructor() {

    }
}

import { Artiste } from './artiste.model';

export class Oeuvre {

    id;
    nom;
    src;
    prix: number;
    artiste: Artiste;
    notation: number;
    description: string;
    likes: number;
    dislikes: number;
    theme?: string;
    style?: string;
    largeur?: string;
    longueur?: string;
    dimensions?: string;
    annee?: string;
    technique?: string;

    constructor() {
        this.id = this.uid();
        this.notation = 0;
        this.likes = 0;
        this.dislikes = 0;
    }

    uid() {
        // tslint:disable-next-line:no-bitwise
        const firstPart = (Math.random() * 466560123) | 0;
        // tslint:disable-next-line:no-bitwise
        const secondPart = (Math.random() * 466560123) | 0;
        // tslint:disable-next-line:no-bitwise
        const s3 = (Math.random() * 466560123) | 0;
        // tslint:disable-next-line:no-bitwise
        const s4 = (Math.random() * 466560123) | 0;

        const f = ('000' + firstPart.toString(36)).slice(-3);
        const s = ('000' + secondPart.toString(36)).slice(-3);
        const a = ('000' + s3.toString(36)).slice(-3);
        const b = ('000' + s4.toString(36)).slice(-3);
        return f + s + a + b;
    }

}

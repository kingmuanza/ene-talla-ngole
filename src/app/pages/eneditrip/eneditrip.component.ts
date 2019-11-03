import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/ia/database.service';

@Component({
    selector: 'app-eneditrip',
    templateUrl: './eneditrip.component.html',
    styleUrls: ['./eneditrip.component.scss']
})
export class EneditripComponent implements OnInit {

    oeuvres = [];
    oeuvre;
    randomList = [];
    i = 0;

    constructor(private database: DatabaseService) { }

    ngOnInit() {
        this.getAllOeuvres();
    }

    ouvrir(o: any) {
        window.location.href = '#!/oeuvre/' + o.id;
    }



    isInArray(value, array) {
        return array.indexOf(value) > -1;
    }

    getAllOeuvres() {
        console.log('getOeuvres()');
        this.database.getCollection('oeuvres').then((item) => {
            console.log('item');
            console.log(item);
            this.oeuvres = item;
        });
    }

    getOeuvres() {
        let nombre = 0;
        const valeurs = [];
        if (this.oeuvres.length > 0) {
            nombre = this.oeuvres.length;
            for (let i = 0; i < nombre; i++) {
                const aleatoire = Math.floor(Math.random() * nombre);
                if (this.isInArray(aleatoire, valeurs)) {

                } else {
                    const oeuvre = this.oeuvres[i];
                    this.randomList.push(oeuvre);
                    valeurs.push(aleatoire);
                }

            }
        }
    }

    jaime() {
        let oeuvre = this.randomList[this.i];
        if (oeuvre.likes) {
            oeuvre.likes = Number(oeuvre.likes) + 1;
        } else {
            oeuvre['likes'] = 1;
        }
        oeuvre = this.setNotation(oeuvre);
        this.database.saveDocument('oeuvres', oeuvre).then(() => {
            console.log('Enregistrement du likes : ' + oeuvre.likes);
            this.suivant();
        });
    }
    jaimePas() {

        let oeuvre = this.randomList[this.i];
        if (oeuvre.dislikes) {
            oeuvre.dislikes = Number(oeuvre.dislikes) + 1;
        } else {
            oeuvre['dislikes'] = 1;
        }
        oeuvre = this.setNotation(oeuvre);
        this.database.saveDocument('oeuvres', oeuvre).then(() => {
            console.log('Enregistrement du dislikes : ' + oeuvre.dislikes);
            this.suivant();
        });
    }

    setNotation(oeuvre) {
        let likes = 0;
        let dislikes = 0;
        if (oeuvre.likes) {
            likes = oeuvre.likes;
        }
        if (oeuvre.dislikes) {
            dislikes = oeuvre.dislikes;
        }
        if (likes + dislikes === 0) {
            oeuvre['notation'] = 0;
        } else {
            const note = (likes / (likes + dislikes)) * 5;
            oeuvre['notation'] = Math.floor(note);
        }
        return oeuvre;
    }

    suivant() {
        console.log('Suivant');
        this.i += 1;
        if (this.i < this.randomList.length) {

        } else {
            this.i = 0;
        }
        this.oeuvre = this.randomList[this.i];
    }

}

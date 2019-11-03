import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  db;

  constructor() {
    this.db = firebase.firestore();
  }

  getCollection(collection): Promise<Array<any>> {
    const liste = [];
    console.log('enediart/' + collection);
    return new Promise((resolve, reject) => {
      firebase.database().ref('enediart/' + collection + '/').once('value').then((snapshot) => {
        if (snapshot != null && snapshot.val() != null) {
          const element = snapshot.val();
          console.log(element);
          const nombre = Object.keys(element).length;
          for (let i = 0; i < nombre; i++) {
            const item = element[Object.keys(element)[i]];
            if (item.user) {

            } else {
              item['user'] = 'Aucun';
            }
            console.log(item);
            liste.push(item);
          }
        } else {
          console.log('Aucun résultat');
        }
        resolve(liste);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  isInArray(value, array) {
    return array.indexOf(value) > -1;
  }

  getCollectionLimitTo(collection, limite, idAExclure): Promise<Array<any>> {
    const liste = [];
    const valeurs = [];
    console.log('enediart/' + collection);
    return new Promise((resolve, reject) => {
      firebase.database().ref('enediart/' + collection + '/').once('value').then((snapshot) => {
        if (snapshot != null && snapshot.val() != null) {
          const element = snapshot.val();
          console.log(element);
          const nombre = Object.keys(element).length;
          let tentative = 0;
          while (liste.length < limite && tentative < limite * nombre) {
            tentative++;
            const aleatoire = Math.floor(Math.random() * nombre);
            if (this.isInArray(aleatoire, valeurs)) {

            } else {
              const a = element[Object.keys(element)[aleatoire]];
              if (idAExclure && a.id === idAExclure) {

              } else {
                liste.push(a);
                valeurs.push(aleatoire);
              }
            }
          }

        } else {
          console.log('Aucun résultat');
        }
        resolve(liste);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  getDocumentById(collection, id) {
    const data = {};
    return new Promise((resolve, reject) => {
      firebase.database().ref('enediart/' + collection + '/' + id).once('value').then((snapshot) => {
        if (snapshot != null && snapshot.val() != null) {
          const item = snapshot.val();
          resolve(item);
        } else {
          reject('Aucun element');
        }
      }).catch((e) => {
        reject(e);
      });
    });
  }

  supprimerDocument(collection, id) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('enediart/' + collection + '/' + id).remove().then((snapshot) => {
        resolve(true);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  saveDocument(collection, element) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('enediart/' + collection + '/' + element.id).set(element).then((snapshot) => {
        resolve(true);
      }).catch((e) => {
        reject(e);
      });
    });
  }

  initDataTable(idtable, colonnes, data, lienNouveau) {
    const columns = [];
    let col;
    for (let i = 0; i < colonnes.length; i++) {
      if (colonnes[i] === 'photo' || colonnes[i] === 'src') {
        const libelle = colonnes[i];
        col = {
          render: (d, type, JsonResultRow, meta) => {
            console.log('JsonResultRow');
            console.log(JsonResultRow);
            console.log(meta);
            return '<img class=\'mini_image\' src=\'' + JsonResultRow[libelle] + '\'>';
          }
        };
      } else {
        col = { data: colonnes[i] };
      }
      columns.push(col);
    }
    columns.push({ data: 'user' });
    console.log('Init datatable');
    console.log(idtable);
    console.log(columns);
    console.log(data[0]);

    const table = $(idtable) as any;
    table.DataTable({
      order: [[0, 'desc'], [1, 'asc']],
      destroy: true,
      // tslint:disable-next-line:object-literal-key-quotes
      'data': data,
      dom: 'Bfrtip',
      buttons: [
        {
          text: 'Nouveau',
          className: 'btn btn-dark',
          action: (e, dt, node, config) => {
            window.location.href = '#!' + lienNouveau;
          }
        },
        {
          text: 'Actualiser',
          className: 'btn btn-dark',
          action: (e, dt, node, config) => {
            // controller.getAll(controller.collection);
          }
        },
        {
          extend: 'excel',
          text: 'Exporter Excel',
          className: 'btn btn-dark'
        },
        {
          extend: 'pdf',
          text: 'Exporter PDF',
          className: 'btn btn-dark'
        }

      ],
      // tslint:disable-next-line:object-literal-key-quotes
      'columns': columns,
      // tslint:disable-next-line:object-literal-shorthand
      // tslint:disable-next-line:object-literal-key-quotes
      'createdRow': (row, d, index) => {
        $(row).data('item', d);
        console.log(d);
      }
    });

  }

  formatDateDay(timestamp) {
    if (timestamp) {
      if (timestamp.seconds) {
        // console.log(timestamp.seconds);
        const d = new Date(timestamp.seconds * 1000);
        return d.toISOString().split('T')[0];
      }
    }
    return null;

  }
  timeToDate(timestamp) {
    if (timestamp) {
      if (timestamp.seconds) {
        console.log(timestamp.seconds);
        const d = new Date(timestamp.seconds * 1000);
        return d;
      }
    }
    return null;
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

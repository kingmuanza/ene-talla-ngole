import { Component, OnInit } from '@angular/core';
import { Oeuvre } from 'src/app/models/oeuvre.model';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/ia/database.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-edit-oeuvre',
  templateUrl: './edit-oeuvre.component.html',
  styleUrls: ['./edit-oeuvre.component.scss']
})
export class EditOeuvreComponent implements OnInit {

  oeuvre: Oeuvre;
  oeuvreForm: FormGroup;
  private readonly notifier: NotifierService;
  artistes = [];

  // tslint:disable-next-line:max-line-length
  constructor(private notifierService: NotifierService, private formBuilder: FormBuilder, private route: ActivatedRoute, private database: DatabaseService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.initForm();
    this.route.paramMap.subscribe(ParamsAsMap => {
      const id = ParamsAsMap.get('id');
      this.getOeuvre(id);
    });
    this.getArtistes();
  }

  initForm() {
    this.oeuvreForm = this.formBuilder.group({
      nom: [this.oeuvre ? this.oeuvre.nom : '', [Validators.required]],
      description: [this.oeuvre ? this.oeuvre.description : '', []],
      artiste: [this.oeuvre ? this.oeuvre.artiste : '', [Validators.required]],
      prix: [this.oeuvre ? this.oeuvre.prix : '', []],
      style: [this.oeuvre ? this.oeuvre.style : '', [Validators.required]],
      theme: [this.oeuvre ? this.oeuvre.theme : '', [Validators.required]],
      annee: [this.oeuvre ? this.oeuvre.annee : '', [Validators.required]],
      technique: [this.oeuvre ? this.oeuvre.technique : '', [Validators.required]],
      dimensions: [this.oeuvre && this.oeuvre.dimensions ? this.oeuvre.dimensions : '172cm * 85cm', []],
    });
  }

  onOeuvreFormSubmit() {
    const value = this.oeuvreForm.value;
    console.log('value');
    console.log(value);
    this.oeuvre.artiste = value.artiste;
    this.oeuvre.nom = value.nom;
    this.oeuvre.description = value.description;
    this.oeuvre.prix = value.prix;
    this.oeuvre.style = value.style;
    this.oeuvre.theme = value.theme;
    this.oeuvre.dimensions = value.dimensions;
    this.oeuvre.annee = value.annee;
    this.oeuvre.technique = value.technique;
    console.log('this.oeuvre');
    console.log(this.oeuvre);
    const that = this;

    this.database.saveDocument('oeuvres', JSON.parse(JSON.stringify(this.oeuvre))).then(() => {

      console.log('Les modifications ont bien été enregistrées');
      that.notifier.show({
        message: 'Les modifications ont bien été enregistrées',
        type: 'success'
      });
      this.initForm();
    }).catch((e) => {
      console.log(e);
    });
  }

  getOeuvre(id) {
    console.log('getOeuvre()');
    this.database.getDocumentById('oeuvres', id).then((item) => {
      console.log('item');
      console.log(item);
      this.oeuvre = item as Oeuvre;
      this.initForm();
    });
  }
  getArtistes() {
    console.log('getArtistes()');
    this.database.getCollection('artistes').then((items) => {
      console.log('items');
      console.log(items);
      this.artistes = items;
      this.initForm();
    });
  }
}

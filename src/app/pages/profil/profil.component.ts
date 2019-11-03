import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/ia/authentication.service';
import * as firebase from 'firebase';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  profilForm: FormGroup;
  utilisateur;
  utilisateurSubscription: Subscription;
  private readonly notifier: NotifierService;

  constructor(private notifierService: NotifierService, private formBuilder: FormBuilder, private authentication: AuthenticationService) {
    this.notifier = notifierService;
  }

  ngOnInit() {

    this.initForm();
    this.utilisateurSubscription = this.authentication.utilisateurSubject.subscribe((utilisateur) => {
      this.utilisateur = utilisateur;
      console.log('utilisateur profil');
      console.log(utilisateur);
      this.initForm();
    });
    this.authentication.update();
  }

  initForm() {
    this.profilForm = this.formBuilder.group({
      displayName: [this.utilisateur ? this.utilisateur.displayName : '', []],
      pays: [this.utilisateur ? this.utilisateur.pays : '', []],
      ville: [this.utilisateur ? this.utilisateur.ville : '', []],
      adresse: [this.utilisateur ? this.utilisateur.adresse : '', []],
      devise: [this.utilisateur ? this.utilisateur.devise : '', []],
      tel: [this.utilisateur ? this.utilisateur.tel : '', []]
    });
  }

  onSubmitProfilForm() {
    const formValue = this.profilForm.value;
    this.utilisateur.displayName = formValue.displayName;
    this.utilisateur.pays = formValue.pays;
    this.utilisateur.ville = formValue.ville;
    this.utilisateur.adresse = formValue.adresse;
    this.utilisateur.devise = formValue.devise;
    this.utilisateur.tel = formValue.tel;
    console.log('this.utilisateur');
    console.log(this.utilisateur);
    firebase.database().ref('enediart/utilisateurs/' + this.utilisateur.uid).set(this.utilisateur).then(() => {
      this.notifier.show({
        message: 'Votre profil a été mis à jour !',
        type: 'success'
      });
    }).catch(() => {
      this.notifier.show({
        message: 'Une erreur est survenue lors de la mise à jour de votre profil. Veuillez recommencer !',
        type: 'error'
      });
    });
  }

}

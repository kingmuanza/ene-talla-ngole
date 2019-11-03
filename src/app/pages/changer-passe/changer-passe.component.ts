import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/ia/authentication.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-changer-passe',
  templateUrl: './changer-passe.component.html',
  styleUrls: ['./changer-passe.component.scss']
})
export class ChangerPasseComponent implements OnInit {

  passeForm: FormGroup;
  utilisateur;
  utilisateurSubscription: Subscription;
  errorMessage = '';
  successMessage = '';

  // tslint:disable-next-line:max-line-length
  constructor(private notifier: NotifierService, private router: Router, private formBuilder: FormBuilder, private authentication: AuthenticationService) { }

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
    this.passeForm = this.formBuilder.group({
      ancien: ['', [Validators.required]],
      nouveau: ['', [Validators.required, Validators.minLength(6)]],
      confirmation: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmitPasseForm() {
    const formValue = this.passeForm.value;
    const ancien = formValue.ancien;
    const nouveau = formValue.nouveau;
    const confirmation = formValue.confirmation;
    if (ancien) {
      const user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        firebase.auth().currentUser.email,
        ancien
      );
      user.reauthenticateAndRetrieveDataWithCredential(credential).then(() => {
        if (nouveau === confirmation) {
          firebase.auth().currentUser.updatePassword(nouveau).then(() => {
            this.successMessage = 'Le mot de passe a été mis à jour';
            this.router.navigate(['connexion']);
          });
        } else {
          this.errorMessage = 'Les mots de passe ne sont pas identiques';
          this.notifier.show({
            message: 'Les mots de passe ne sont pas identiques',
            type: 'error'
          });
        }
      }).catch((error) => {
        console.log(error);
        this.errorMessage = 'Le mot de passe n\'est pas le bon';
        this.notifier.show({
          message: 'Le mot de passe n\'est pas le bon',
          type: 'error'
        });
      });
    } else {
      this.errorMessage = 'Veuillez entrer votre mot de passe actuel';
      this.notifier.show({
        message: 'Veuillez entrer votre mot de passe actuel',
        type: 'error'
      });
    }
  }


}

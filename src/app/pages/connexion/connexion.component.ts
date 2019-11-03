import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/ia/authentication.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  connexionForm: FormGroup;
  message = '';
  private readonly notifier: NotifierService;

  // tslint:disable-next-line:max-line-length
  constructor(private notifierService: NotifierService, private authentication: AuthenticationService, private router: Router, private formBuilder: FormBuilder) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.connexionForm = this.formBuilder.group({
      login: ['', []],
      passe: ['', [Validators.required]]
    });
  }

  onSubmitConnexionForm() {
    console.log('onSubmitConnexionForm');
    const that = this;
    const formValue = this.connexionForm.value;
    const login = formValue.login;
    const passe = formValue.passe;
    this.authentication.connexion(login, passe).then(() => {
      this.router.navigate(['oeuvres']);
    }).catch((e) => {
      console.log('Email ou mot de passe incorrect');
      this.message = 'Email ou mot de passe incorrect';
      that.notifier.show({
        message: 'Email ou mot de passe incorrect',
        type: 'error'
      });
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import * as firebase from 'firebase';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  contactForm: FormGroup;
  private readonly notifier: NotifierService;

  constructor(private notifierService: NotifierService, private formBuilder: FormBuilder) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  onSubmitContactForm() {
    console.log('onSubmitContactForm');
    const that = this;
    const formValue = this.contactForm.value;
    const mail = formValue.email;
    const contenu = formValue.message;
    let messages = [];
    const element = {
      email: mail,
      message: contenu,
      date: new Date()
    };
    firebase.database().ref('enediart/messages/').once('value').then((snapshot) => {
      console.log('Recupération des messages');
      console.log('Recupération des messages');
      if (snapshot.val()) {
        messages = snapshot.val();
      } else {
        messages.push(element);
      }
      firebase.database().ref('enediart/messages/').set(messages).then(() => {
        that.notifier.show({
          message: 'Votre message a bien été envoyé',
          type: 'success'
        });
        this.initForm();
      });

    }).catch((e) => {
      console.log('erreur');
      console.log(e);
    });
  }

  saveRouteVisite() {
    console.log('CONTACTEZ NOUS');
    const visite = {
      path: 'contacteznous',
      date: new Date()
    };
    localStorage.setItem('EnediartLastRoute', JSON.stringify(visite));
  }

}

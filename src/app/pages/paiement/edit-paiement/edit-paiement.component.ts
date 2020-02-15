import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/ia/authentication.service';
import * as firebase from 'firebase';
import { NotifierService } from 'angular-notifier';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-edit-paiement',
  templateUrl: './edit-paiement.component.html',
  styleUrls: ['./edit-paiement.component.scss']
})
export class EditPaiementComponent implements OnInit {

  panier = [];
  oeuvre;
  backgroundImage = '';
  total = 0;
  taxe = 0.1925;
  panierSubscription: Subscription;
  profilForm: FormGroup;
  utilisateur;
  utilisateurSubscription: Subscription;
  private readonly notifier: NotifierService;
  public payPalConfig?: IPayPalConfig;
  url = 'https://api.orange.com/orange-money-webpay/dev/v1/webpayment';

  connexionForm: FormGroup;
  message = '';


  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, private notifierService: NotifierService, private formBuilder: FormBuilder, private authentication: AuthenticationService) { }

  ngOnInit() {
    this.initForm();
    this.initConfig();
    // this.payByOrangeMoney();
    this.panierSubscription = this.authentication.panierSubject.subscribe((panier: any[]) => {
      this.panier = panier;
      console.log('panier format');
      localStorage.setItem('ENEDIARTPanier', JSON.stringify(this.panier));
      console.log(panier);
      this.getPanier();
    });
    this.initForm();
    this.utilisateurSubscription = this.authentication.utilisateurSubject.subscribe((utilisateur) => {
      this.utilisateur = utilisateur;
      console.log('utilisateur profil');
      console.log(utilisateur);
      this.initForm();
    });
    this.authentication.update();
  }

  getHttpConfig() {
    return this.http.get(this.url);
  }

  showHttpConfig() {
    this.getHttpConfig().subscribe((data) => {
      console.log(data);
    });
  }

  payByOrangeMoney() {
    const h = new HttpHeaders()
      .set('cache-control', 'no-cache')
      .set('content-type', 'application/json')
      .set('Authorization', 'Bearer b2dLa0kxTGpKM3hHTnpITzdCU2RveEFwYnB5U25nc3c6Q29NdnJBS2dHcjdoWklPZQ==');

    const body = {
      merchant_key: 'a86b2087'
    };

    return this.http
      .post(this.url, body, { headers: h })
      .subscribe((res: any) => res.json);
  }

  initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: '9.99',
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: '9.99'
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: '9.99',
                },
              }
            ]
          }
        ]
      } as ICreateOrderRequest,
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        // this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  getPanier() {
    this.total = 0;
    if (this.authentication.panier) {
      this.panier = this.authentication.panier;
      for (let i = 0; i < this.panier.length; i++) {
        const oeuvre = this.panier[i];
        this.backgroundImage = oeuvre.src;
        this.total += Number(oeuvre.prix);
      }
    }
  }

  prix(prix) {
    if (this.getDevise() === 'euro') {
      return prix / 655.0;
    } else {
      return prix;
    }
  }

  devise() {
    if (this.getDevise() === 'euro') {
      return '€';
    } else {
      return 'XAF';
    }
  }

  prixEtDevise(prix) {
    if (this.getDevise() === 'euro') {
      return this.devise() + ' ' + this.prix(prix);
    } else {
      return this.prix(prix) + ' ' + this.devise();
    }
  }

  getDevise() {
    const devise = localStorage.getItem('EnediartDevise');
    return devise;
  }

  ouvrir(i) {
    this.oeuvre = this.panier[i];
    const modal = $('#exampleModal') as any;
    modal.modal('show');
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
      // this.router.navigate(['oeuvres']);
    }).catch((e) => {
      console.log('Email ou mot de passe incorrect');
      this.message = 'Email ou mot de passe incorrect';
      that.notifier.show({
        message: 'Email ou mot de passe incorrect',
        type: 'error'
      });
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

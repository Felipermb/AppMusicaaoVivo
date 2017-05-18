import { Component } from '@angular/core';
import { NavController,AlertController, NavParams, LoadingController  } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from "firebase";  
import { Login } from "../../models/loginModel";

import { AuthService } from '../../providers/auth-service';

import { RegistrarPage } from "../registrar/registrar";
import { UserPage } from "../user-page/user-page";
import { EventosPage } from "../eventos/eventos";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario: Login;
  sucesso: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  texto: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
    public authService: AuthService , public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.usuario = new Login();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  focusInEmail(){
    this.sucesso = false;
  }

  openRegistrarPage(){
    this.navCtrl.push(RegistrarPage);
  }

  openUserPage(){
    // this.navCtrl.setRoot(EventosPage);
    this.navCtrl.setRoot(UserPage);
  }

  loginUser(){
    this.submitAttempt = true;

    if (this.usuario.email == "" || this.usuario.senha == ""){
      this.texto = "Insira email e senha";
    } else {
      this.authService.doLogin(this.usuario.email, this.usuario.senha).then( authService => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(UserPage);
        })
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
            ]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde um momento...',
        // dismissOnPageChange: true,
      });
      this.loading.present()
    }
  }
}

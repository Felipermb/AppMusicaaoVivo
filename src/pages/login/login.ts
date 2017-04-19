import { Component } from '@angular/core';
import { NavController,AlertController, NavParams, LoadingController  } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from "firebase";  
import { Login } from "../../models/loginModel";

import { AuthService } from '../../providers/auth-service';

import { RegistrarPage } from "../registrar/registrar";
import { UserPage } from "../user-page/user-page";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario: Login;
  sucesso: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
    public authService: AuthService , public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.usuario = new Login();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // loginFunction(){
  //   console.log(this.usuario.email + "--" + this.usuario.senha);

  //   var teste = true;
  //   this.authService.doLogin(this.usuario.email,this.usuario.senha) ;
  // }

  openRegistrarPage(){
    this.navCtrl.push(RegistrarPage);
  }

  openUserPage(){
    this.navCtrl.setRoot(UserPage);
  }

  loginUser(){
    this.submitAttempt = true;

    if (this.usuario.email == "" || this.usuario.senha == ""){
      console.log(this.usuario.email);
    } else {
      this.authService.doLogin(this.usuario.email, this.usuario.senha).then( authService => {
        this.navCtrl.setRoot(UserPage);
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

      // this.loading = this.loadingCtrl.create({
      //   dismissOnPageChange: true,
      // });
      // this.loading.present();
    }
  }

  // verificarUsusarioLogado(){
  //   var teste = firebase.auth().onAuthStateChanged(function(user) {
  //     if (user) {
  //       console.log("Ususario logado = " + user.uid);
  //       console.log("Email = " + user.email);
  //       return true;
  //     } else {
  //       console.log("Ninguem logado");
  //       return false;
  //     }
  //   });

  //   if(teste){
  //     this.openUserPage();
  //   }
  // }
}

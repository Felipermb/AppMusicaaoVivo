import { Component } from '@angular/core';
import { NavController,AlertController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from "firebase";
import { Login } from "../../models/loginModel";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario: Login;
  sucesso: boolean = false;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams) {
    this.usuario = new Login();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  testeLabel(teste: string){
    console.log(teste);
  }

  loginFunction(){
    console.log(this.usuario.email + "--" + this.usuario.senha);

    var teste = true;
    firebase.auth().signInWithEmailAndPassword(this.usuario.email , this.usuario.senha).catch( function(error) {
      // var errorCode = error.code;
      teste = false;
      alert("erro Usuario");
      console.log(error);
      var errorMessage = error.message;
    });

    
  }
}

import { Component } from '@angular/core';
import { NavController,AlertController, NavParams, LoadingController  } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from "firebase";  
import { Login } from "../../models/loginModel";

import { AuthService } from '../../providers/auth-service';

import { UserPage } from "../user-page/user-page";

@Component({
	selector: 'page-registrar',
	templateUrl: 'registrar.html'
})
export class RegistrarPage {

	email: any;
	senha: any;
	nome: any;
	sucesso = false;
	texto: any;

	constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
		public authService: AuthService , public navParams: NavParams, public loadingCtrl: LoadingController) {
	}

	focusInNome(){
		this.sucesso = false;
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad RegistrarPage');
	}

	registerUser(){
		this.authService.register(this.email, this.senha, this.nome).then( authService => {
			this.navCtrl.setRoot(UserPage);
		}, error => {
			this.sucesso = true;
			this.texto = error.message;
			console.log(error.message);
		});
	}

	

}

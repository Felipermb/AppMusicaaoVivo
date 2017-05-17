import { Component } from '@angular/core';
import { NavController,AlertController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from "firebase";

import { AuthService } from '../../providers/auth-service';

import { HomePage } from "../home/home";
import { DetalharEventoPage } from '../detalhar-evento/detalhar-evento';


@Component({
	selector: 'page-user-page',
	templateUrl: 'user-page.html'
})
export class UserPage {

	eventos: FirebaseListObservable<any>;
	estabelecimentos: FirebaseListObservable<any>;
	bandas: FirebaseListObservable<any>;

	name: any;
	email : any; 
	photoUrl : any; 
	uid : any;

	evento: [any];

	constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams,
		public authService: AuthService,  af: AngularFire) {

		this.eventos = af.database.list('/Evento');
		this.estabelecimentos = af.database.list('/Estabelecimento');	

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad UserPage');
	}

	openHomePage(){
		this.navCtrl.setRoot(HomePage);
	}

	logout() {
		this.authService.doLogout();
		this.openHomePage();
	}
	navigate(evento){
		this.navCtrl.push(DetalharEventoPage, {
			item: evento
		});
	}

	// verificarUsusarioLogado(){
		// 		firebase.auth().onAuthStateChanged(function(user) {
			// 				if (user) {
				// 						console.log("Ususario logado = " + user.uid);
				// 						console.log("Email = " + user.email);
				// 						return true;
				// 					} else {
					// 							console.log("Ninguem logado");
					// 							return false;
					// 						}
					// 					});
					// 					console.log(teste);
					// 					if(!teste){
						// 							this.openHomePage();
						// 						}
						// 					}
					}

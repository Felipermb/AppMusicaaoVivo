import { Component } from '@angular/core';
import { NavController,AlertController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Geolocation } from '@ionic-native/geolocation';
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

	latitudeUser: number = null;
	longitudeUser: number = null;

	name: any;
	email : any; 
	photoUrl : any; 
	uid : any;

	evento: [any];

	constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams,
		public authService: AuthService,  af: AngularFire, public geolocation: Geolocation,  public loadingCtrl: LoadingController) {

		if(this.latitudeUser == null && this.longitudeUser == null){
			this.getLocation();			
		}
		var self = this;
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				self.uid = user.uid;
				console.log(self.uid)
			} else {
				console.log("Ninguem logado");
				return false;
			}
		}); 

		this.eventos = af.database.list('/Evento');
		this.estabelecimentos = af.database.list('/Estabelecimento');	

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad UserPage');
	}

	getLocation():void {

		let loading = this.loadingCtrl.create({
			content: 'Carregando dados...'
		});
		loading.present();

		this.geolocation.getCurrentPosition().then((position) => {
			this.latitudeUser = position.coords.latitude;
			this.longitudeUser = position.coords.longitude;
			console.log(this.latitudeUser);
			console.log(this.longitudeUser);
			loading.dismiss();
		}, (error) => {
			loading.dismiss();
			alert(error);
		});
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
			item: evento,
			lat: this.latitudeUser,
			lng: this.longitudeUser
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

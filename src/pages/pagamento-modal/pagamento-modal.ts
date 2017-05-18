import { Component } from '@angular/core';
import { NavController, NavParams, ViewController  } from 'ionic-angular';

import { UserPage } from "../user-page/user-page";
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import firebase from 'firebase';

@Component({
	selector: 'page-pagamento-modal',
	templateUrl: 'pagamento-modal.html'
})
export class PagamentoModalPage {

	loading: any;
	cartao: any;
	codSeguranca: any;

	usuario: FirebaseObjectObservable<any>;
	evento: FirebaseObjectObservable<any>;
	uid: any;
	cover: any;
	editado: any; 
	uidEvento: any;

	constructor(public viewCtrl: ViewController,public nav: NavParams,
		public navCtrl: NavController, af: AngularFire) {

		var self = this;
		this.uidEvento = this.nav.get("uidEvento");
		this.editado = this.nav.get("item");
		this.cover = "R$ "+this.editado	+",00"
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				self.usuario = af.database.object('/Login/'+user.uid);
				self.uid = user.uid;
			} else {
				console.log("Ninguem logado");
				return false;
			}
		}); 

	}

	closeModal() {
		this.viewCtrl.dismiss(false);
	}

	isNumeric(str) {
		var er = /^[0-9]+$/;
		return (er.test(str));
	}

	mascara(codigo){
		var array = codigo.split('')
		var tamanho = array.length
		var numDigitos = 0
		var result = ""

		console.log("Mascara")

		for(let caracter of array){
			if(this.isNumeric(caracter)){
				numDigitos += 1;
				result += caracter;
				if(numDigitos == 4 || numDigitos == 8 || numDigitos == 12){
					result += " ";
				}
			}
		}

		this.cartao =  result;
	}

	pagamento(){
		var self = this;
		console.log("Cartao: "+this.cartao);
		console.log("Seg: "+this.codSeguranca);
		var upvotesRef = firebase.database().ref("Login/" + this.uid + "/nivel/");
		upvotesRef.transaction(function (current_value) {
			return (current_value || 0) + 1;
		});	

		var er : number;
		er = parseInt(this.editado, 10)
		console.log(er);
		var upDinheiro = firebase.database().ref("Evento/" + this.uidEvento + "/dinheiro/");
		upDinheiro.transaction(function (current_value) {
			return (current_value || 0) + er;
		});	

		this.viewCtrl.dismiss(true);
	}



}

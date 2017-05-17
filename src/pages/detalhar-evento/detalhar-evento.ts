import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Geolocation } from '@ionic-native/geolocation';
import firebase from "firebase";

declare var google

@Component({
	selector: 'page-detalhar-evento',
	templateUrl: 'detalhar-evento.html'
})
export class DetalharEventoPage {

	
	@ViewChild('map') mapElement: ElementRef;
	map: any;

	evento : any;
	latitudeUser: number
	longitudeUser: number

	constructor(public navCtrl: NavController, public navParams: NavParams,
		af: AngularFire, public geolocation: Geolocation,  public loadingCtrl: LoadingController) {
		var self = this;

		this.evento = navParams.get("item");
		console.log(this.evento);
		// firebase.database().ref("/Evento/"+navParams.data.item).once('value').then(function(snapshot) {
			// 	var username = snapshot.val().username;
			// })
		}

		ionViewDidLoad(){
			this.loadMap();
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

		loadMap(){

			// let latLng = new google.maps.LatLng(this.evento.latitute, this.evento.longitude);
			let latLng = new google.maps.LatLng(this.evento.latitute, this.evento.longitude);

			let mapOptions = {
				center: latLng,
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}

			this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

			let marker = new google.maps.Marker({
				map: this.map,
				animation: google.maps.Animation.DROP,
				position: this.map.getCenter()
			});

			let content = "<h4>"+ this.evento.Estabelecimento +"</h4>";          

			let infoWindow = new google.maps.InfoWindow({
				content: content
			});

			google.maps.event.addListener(marker, 'click', () => {
				infoWindow.open(this.map, marker);
			});

		}

	}

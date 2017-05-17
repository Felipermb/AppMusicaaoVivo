import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController  } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Geolocation } from '@ionic-native/geolocation';
import firebase from "firebase";

declare var google


import { PagamentoModalPage } from '../pagamento-modal/pagamento-modal';

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
		af: AngularFire, public geolocation: Geolocation,public modalCtrl: ModalController,
		public loadingCtrl: LoadingController) {

		var self = this;

		this.evento = navParams.get("item");
		this.latitudeUser = navParams.get("lat");
		this.longitudeUser = navParams.get("lng");
		console.log("User: "+this.latitudeUser+" - "+this.longitudeUser);
		console.log("Esta: "+this.evento.latitute+" - "+this.evento.longitude);
		// this.loadMap();
		// this.initMap();
		// this.getDistancia(this.evento.latitute, this.evento.longitude)
	}

	ionViewDidLoad(){
		this.initMap();
	}


	initMap() {
		var pointA = new google.maps.LatLng(this.latitudeUser, this.longitudeUser),
		pointB = new google.maps.LatLng(this.evento.latitute, this.evento.longitude),
		myOptions = {
			zoom: 7,
			center: pointA
		},
		map = new google.maps.Map(document.getElementById('map'), myOptions),
		// Instantiate a directions service.
		directionsService = new google.maps.DirectionsService,
		directionsDisplay = new google.maps.DirectionsRenderer({
			map: map
		}),
		markerA = new google.maps.Marker({
			position: pointA,
			title: "point A",
			label: "A",
			map: map
		}),
		markerB = new google.maps.Marker({
			position: pointB,
			title: "point B",
			label: "B",
			map: map
		});

		let contentA = "<h6> Sua localização atual </h6>";
		let contentB = "<h6>"+this.evento.Estabelecimento+"</h6>";

		this.addInfoWindow(markerA, contentA);
		this.addInfoWindow(markerB, contentB);

		// get route from A to B
		this.calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);

	}

	addInfoWindow(marker, content){

		let infoWindow = new google.maps.InfoWindow({
			content: content
		});

		google.maps.event.addListener(marker, 'click', () => {
			infoWindow.open(this.map, marker);
		});
	}


	calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
		directionsService.route({
			origin: pointA,
			destination: pointB,
			avoidTolls: true,
			avoidHighways: false,
			travelMode: google.maps.TravelMode.DRIVING
		}, function (response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		});
	}

	clickCard(){
		console.log("PAGA PIVETE");
		let myModal = this.modalCtrl.create(PagamentoModalPage);
		myModal.present();
	}
}
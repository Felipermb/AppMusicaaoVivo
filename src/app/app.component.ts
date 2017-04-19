import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from "firebase";


// Importação das Paginas
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistrarPage } from '../pages/registrar/registrar' ;
import { UserPage } from '../pages/user-page/user-page';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    // if(this.verificarUsusarioLogado()){
    //   this.rootPage = UserPage;
    // }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

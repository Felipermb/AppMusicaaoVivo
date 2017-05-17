import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import * as firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation';
// import firebase from "firebase";

import { AuthService } from '../providers/auth-service';

//importação das Páginas do App
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistrarPage } from '../pages/registrar/registrar' ;
import { UserPage } from '../pages/user-page/user-page';
import { DetalharEventoPage } from '../pages/detalhar-evento/detalhar-evento';


// Configuração do FireBase, Onde conecto com a URL e recebo os .json
export const firebaseConfig = {
  apiKey: "AIzaSyDOFzYrnh82Xq0d702oO5Dg5qTygdVABqk",
  authDomain: "musica-ao-vivo.firebaseapp.com",
  databaseURL: "https://musica-ao-vivo.firebaseio.com",
  storageBucket: "musica-ao-vivo.appspot.com",
  messagingSenderId: "728155461690"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrarPage,
    UserPage,
    DetalharEventoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrarPage,
    UserPage,
    DetalharEventoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

import { Component } from '@angular/core';
import { NavController, AlertController ,  ActionSheetController  } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { AuthService } from '../../providers/auth-service';

import firebase from "firebase";

//Importação da Paginas que serão chamadas por essa tela
import { LoginPage } from '../login/login';
import { UserPage } from '../user-page/user-page';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // songs: FirebaseListObservable<any>;
  teste: any;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    af: AngularFire, public actionSheetCtrl: ActionSheetController) {
    // this.songs = af.database.list('/songs');"

    var self = this;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.openUserPage();
      } else {
        console.log("Ninguem logado");
        return false;
      }
    }); 
  } 

  openUserPage(){
    this.navCtrl.setRoot(UserPage);
  }

  openLoginPage(){
    this.navCtrl.push(LoginPage);
  }

  
  // addSong(){
    //   let prompt = this.alertCtrl.create({
      //     title: 'Song Name',
      //     message: "Enter a name for this new song you're so keen on adding",
      //     inputs: [
      //     {
        //       name: 'title',
        //       placeholder: 'Title'
        //     },
        //     ],
        //     buttons: [
        //     {
          //       text: 'Cancel',
          //       handler: data => {
            //         console.log('Cancel clicked');
            //       }
            //     },
            //     {
              //       text: 'Save',
              //       handler: data => {
                //         this.songs.push({
                  //           title: data.title
                  //         });
                  //       }
                  //     }
                  //     ]
                  //   });
                  //   prompt.present();
                  // }

                  // updateSong(songId, songTitle){
                    //   console.log(songId)
                    //   let prompt = this.alertCtrl.create({
                      //     title: 'Song Name',
                      //     message: "Update the name for this song",
                      //     inputs: [
                      //     {
                        //       name: 'title',
                        //       placeholder: 'Title',
                        //       value: songTitle
                        //     },
                        //     ],
                        //     buttons: [
                        //     {
                          //       text: 'Cancel',
                          //       handler: data => {
                            //         console.log('Cancel clicked');
                            //       }
                            //     },
                            //     {
                              //       text: 'Save',
                              //       handler: data => {
                                //         this.songs.update(songId, {
                                  //           title: data.title
                                  //         });
                                  //       }
                                  //     }
                                  //     ]
                                  //   });
                                  //   prompt.present();
                                  // }

                                  // showOptions(songId, songTitle) {
                                    //   let actionSheet = this.actionSheetCtrl.create({
                                      //     title: 'What do you want to do?',
                                      //     buttons: [
                                      //     {
                                        //       text: 'Delete Song',
                                        //       role: 'destructive',
                                        //       handler: () => {
                                          //         this.removeSong(songId);
                                          //       }
                                          //     },{
                                            //       text: 'Update title',
                                            //       handler: () => {
                                              //         this.updateSong(songId, songTitle);
                                              //       }
                                              //     },{
                                                //       text: 'Cancel',
                                                //       role: 'cancel',
                                                //       handler: () => {
                                                  //         console.log('Cancel clicked');
                                                  //       }
                                                  //     }
                                                  //     ]
                                                  //   });
                                                  //   actionSheet.present();
                                                  // }



                                                  // removeSong(songId: string){
                                                    //   this.songs.remove(songId);
                                                    // }

                                                  }

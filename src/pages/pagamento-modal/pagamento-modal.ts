import { Component } from '@angular/core';
import { NavController, NavParams, ViewController  } from 'ionic-angular';

/*
  Generated class for the PagamentoModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pagamento-modal',
  templateUrl: 'pagamento-modal.html'
})
export class PagamentoModalPage {

  constructor(public viewCtrl: ViewController) {}

  closeModal() {
    this.viewCtrl.dismiss();
  }

}

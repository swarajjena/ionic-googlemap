import { Component } from '@angular/core';
import { NavController, NavParams ,IonicPage,PopoverController,ViewController} from 'ionic-angular';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { DetailPage } from '../detail/detail';

import { ContInfoPage } from '../cont-info/cont-info';

/**
 * Generated class for the ContInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const SERVER_URL="http://52.172.133.188:3001/"
const SOCKET_SERVER_URL="ws://52.172.133.188:3001/"
const OPEN_SERVER_URL="http://52.172.133.188:4000/"


@Component({
  template: `
    <ion-list>
      <button ion-item (click)="close()" *ngFor="let ntf of all_notifications" 
      (click)="goToPage(ntf)">
          {{ntf.msg}}
      </button>
    </ion-list>
  `
})
export class PopoverPage {
  all_notifications=[];

  constructor(public navCtrl: NavController,public navParams: NavParams,public viewCtrl: ViewController) {
    this.all_notifications=this.navParams.get("data");
  }

  ionViewDidLoad() {



    
  }

  close() {
    this.viewCtrl.dismiss();
  }

  goToPage(ntf){
    if(ntf.vesselId!=undefined && ntf.vesselId!='' ){
      console.log(ntf.vesselId);
      this.navCtrl.setRoot(ContInfoPage, {
        vessel:ntf.vesselId
      })    
    }else{
      console.log("cont"+ntf.contId)
      this.navCtrl.setRoot(ContInfoPage, {
        cid:ntf.contId
      })    

    }
  }
}


import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const  SERVER_URL="http://104.211.96.209:3000/";

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  registerCredentials = { username: '', password: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  login(){
    this.http.post(SERVER_URL+'auth/local',this.registerCredentials)
      .subscribe(
          data => {
              console.log(data);
          },error => {
            console.log(error)
          }
      )      
  }

}

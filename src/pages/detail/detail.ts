import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Storage } from '@ionic/storage';
import { ContInfoPage } from '../cont-info/cont-info';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const SERVER_URL="http://52.172.133.188:3001/"



@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  registerCredentials = { username: '', password: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient,private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    this.storage.get("user").then(
      data=>{
        let time_diff=new Date().getTime()-new Date(data.created).getTime()
        console.log(time_diff);
        if(time_diff>3600000){
        }else{
          this.navCtrl.push(ContInfoPage)
        }
      });
    
  }

  login(){
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };


    this.http.post(SERVER_URL+'api/users/login',"username="+this.registerCredentials.username+"&password="+this.registerCredentials.password,options).toPromise()
    .then(data=>{
          console.log(data)
          data["username"]=this.registerCredentials.username;
          this.storage.set("user",data).then(()=>{
            this.storage.get("user").then(
              data=>{
                console.log(data);
                this.navCtrl.push(ContInfoPage);
              });
          })

        }
        ,err=>{
          console.log(err)
        }
    )
    
  }



/*    .subscribe(
          data => function(data){
              console.log(data);
              this.httpClient.post(ADMIN_SERVER_URL+'api/system/identities/issue', identity, {responseType: 'blob'})
          }.bind(this),error => {
            console.log(error)
          }
    )      */
  

}

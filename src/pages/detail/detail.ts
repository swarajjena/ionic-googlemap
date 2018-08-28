import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const  SERVER_URL="http://104.211.96.209:3001/";
const  ADMIN_SERVER_URL="http://104.211.96.209:4000/";

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

  getFormUrlEncoded(toConvert) {
		const formBody = [];
		for (const property in toConvert) {
			const encodedKey = encodeURIComponent(property);
			const encodedValue = encodeURIComponent(toConvert[property]);
			formBody.push(encodedKey + '=' + encodedValue);
		}
		return formBody.join('&');
	}

  login(){
    let body = new URLSearchParams();
    body.set('username', this.registerCredentials.username);
    body.set('password', this.registerCredentials.password);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    this.http.post(SERVER_URL+'auth/local',this.getFormUrlEncoded(this.registerCredentials),options).toPromise()
    .then(data=>function(data){
          console.log(data)
        }.bind(this)
        ,err=>{
          console.log(err)
        }
    )
    
  }
  issue_identity(){
    console.log("ok")
    const identity = {
      participant: 'org.hack.sagarmala.CUSTOMS#CUSTOMS1',
      userID: "CUSTOMS1o",
      options: {}
    };    
    this.http.post(ADMIN_SERVER_URL+'api/system/identities/issue', identity,{responseType: 'blob'}).subscribe(
      cardData=>{
        console.log(cardData.size);
        const file = new File([cardData], 'myCard.card', {type: 'application/octet-stream', lastModified: Date.now()});
        const formData = new FormData();
        formData.append('card', file);

        const headers = new HttpHeaders();
        headers.set('Content-Type', 'multipart/form-data');
        this.http.post(SERVER_URL+'api/wallet/import', formData, {withCredentials: true, headers}).toPromise()
        .then(data=>{
          console.log(data)
        },err=>{
          console.log(err)
        })
    
      },
      err=>console.log(err)
    );
    
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

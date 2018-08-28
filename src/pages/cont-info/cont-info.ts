import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { DetailPage } from '../detail/detail';

import { HomePage } from '../home/home';

/**
 * Generated class for the ContInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const SERVER_URL="http://52.172.133.188:3001/"
const OPEN_SERVER_URL="http://52.172.133.188:4000/"


const MAPPING={
"viaRegistered":"VIA is registered by VOA",
"IGMFiled":"VOA files Import General Manifest",
"registeredVesselDetails":"Registration of vessel details by VOA",
"requestedBerthAllocation":"Berth allotment request by VOA",
"BerthAllocated":"Berth allotment by Port Authority",
"immigrationCompletedFormalities":"Immigration to complete formalities",
"customsCompletedFormalities":"Customs to complete formalities",
"PHOCompletedFormalities":"PHO to complete formalities",
"otherAuth1CompletedFormalities":"Other formality 1",
"otherAuth2CompletedFormalities":"Other formality 2",
"vesselUnloadingStarted":"Start of vessels unloading",
"vesselUnloadingEnded":"End of vessels unloading",
"vesselLoadingStarted":"Start of vessels loading",
"vesselLoadingEnded":"End of vessels loading",
"containerDischarged":"Container discharged",
"deliveryOrderIssued":"Issue Delivery Order",
"billOfEntryRegistered":"Bill Registration",
"dutyPaid":"Pay Duty",
"deliveryRequested":"Request delivery of containers",
"jobOrderIssued":"Issue Job order ",
"containerLoadedInTruck":"Container to be located and loaded",
"containerPortOut":"Port Out with loaded container"
}

const BLOCKS=[
  ["viaRegistered","IGMFiled","registeredVesselDetails","requestedBerthAllocation","BerthAllocated"],
  
  ["immigrationCompletedFormalities","customsCompletedFormalities","PHOCompletedFormalities","otherAuth1CompletedFormalities","otherAuth2CompletedFormalities",
  "vesselUnloadingStarted","vesselUnloadingEnded","vesselLoadingStarted","vesselLoadingEnded"],
  ["containerDischarged","deliveryOrderIssued","billOfEntryRegistered","dutyPaid"],
  ["deliveryRequested","jobOrderIssued","containerLoadedInTruck","containerPortOut"]
]




@Component({
  selector: 'page-cont-info',
  templateUrl: 'cont-info.html',
})
export class ContInfoPage {
  user:any={};
  active_block=0;


  show_events=[
  ];

  vesselID="";
  containerID=""

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient,private storage: Storage) {

  }

  ionViewDidLoad() {
    this.storage.get("user").then(
      data=>{
        if(data==="" || data==undefined)return;
        let time_diff=new Date().getTime()-new Date(data.created).getTime()
        console.log(time_diff);
        if(time_diff<3600000){
          this.user=data;
        }else{
          this.navCtrl.push(DetailPage)
        }
        if(this.navParams.get("container")){
          this.containerID=this.navParams.get("container");
        }
        else if(this.navParams.get("vessel")){
          this.vesselID=this.navParams.get("vessel");
        }else{
           this.vesselID="VESSEL1";
        }
        if(this.containerID!=""){
  
        }else{
            this.get_task_list_vessel();
        }
    });
      console.log('ionViewDidLoad ContInfoPage');
  }

  make_active(ind){
    this.active_block=ind;
  }

  goToMApPage(){
    this.navCtrl.push(HomePage)
  }

  get_task_list_vessel(){
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    let access_tiken="withCredentials=true&access_token="+this.user.id;
  
    this.http.get(OPEN_SERVER_URL+'api/queries/getTasksForVessel?vesselParam=VESSEL1',options).toPromise()
    .then(data=>{
          for(let i in data){
            console.log(data[i]);
            let block=0;
            this.active_block=0;

            for(let j=0;j<BLOCKS.length;j++){
              if(BLOCKS[j].indexOf(data[i].transactionId)>=0){
                 block=j;
                 break;
              }
            }
            console.log(this.active_block)

            if(block>this.active_block)this.active_block=block;

            let task={
              "id":data[i].transactionId,
              "name":MAPPING[data[i].transactionId],
              "group":"preberth",
              "date":data[i].completed_at!=undefined?data[i].completed_at:data[i].created_at,
              "status":data[i].finished?"finished":"pending"
            };
            if(this.show_events[block]!==undefined)
                this.show_events[block].push(task);
            else
                this.show_events[block]=[task];

          } 


    }
    ,err=>{
          console.log(err)
    }
    )
  
  }


}

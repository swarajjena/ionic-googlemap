import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
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

   file_upload_task=["viaRegistered","IGMFiled","registeredVesselDetails","billOfEntryRegistered"]

   FILE_CHECK_TASK=["BerthAllocated","immigrationCompletedFormalities","customsCompletedFormalities","PHOCompletedFormalities","otherAuth1CompletedFormalities","otherAuth2CompletedFormalities"]
  
  
  myInput:String;

  toDoTask=null;


  show_events=[
  ];

  vesselID="";
  containerID=""

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient,private storage: Storage) {

  }

  logout(){
    
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');


    let options={
      headers:headers
    }
    this.http.post(SERVER_URL+'api/users/logout?access_token='+this.user.id,{},options).toPromise()
    .then(data=>{
        this.storage.set("user","").then(()=>{
          this.navCtrl.push(DetailPage)
        })

    });

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
           this.vesselID="J0522";
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

  search(q: string) { 

  }


  uploadDocument(){
    
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');


    let options={
      headers:headers
    }

    let opts;
    if(this.file_upload_task.indexOf(this.toDoTask)>=0){
      opts={vessel:"resource:org.hack.sagarmala.Vessel#"+this.vesselID,file_path:"jknkn"};
    }else if(this.toDoTask=="BerthAllocated"){
      opts={vessel:"resource:org.hack.sagarmala.Vessel#"+this.vesselID,berth:"jknkn"};
    }else{
      opts={vessel:"resource:org.hack.sagarmala.Vessel#"+this.vesselID};
    }
    
    this.http.post(SERVER_URL+'api/'+this.toDoTask+"?access_token="+this.user.id,opts,options).toPromise()
    .then(data=>{
          console.log(data)
          this.navCtrl.setRoot(ContInfoPage);
        }
        ,err=>{
          console.log(err)
        }
    )


  }

  approveDocument(){

  }

  disapproveDocument(){
    
  }



  get_task_list_vessel(){
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    let access_tiken="withCredentials=true&access_token="+this.user.id;
  
    this.http.get(OPEN_SERVER_URL+'api/queries/getTasksForVessel?vesselParam='+this.vesselID,options).toPromise()
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

            if(this.toDoTask==null && data[i].assigneeID===this.user.username && !data[i].finished){
              this.toDoTask=data[i].transactionId;
              console.log("hoila");

            }

          } 


    }
    ,err=>{
          console.log(err)
    }
    )
  
  }


}

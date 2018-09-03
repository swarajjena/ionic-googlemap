import { Component } from '@angular/core';
import { NavController, NavParams ,IonicPage,PopoverController,ViewController} from 'ionic-angular';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { DetailPage } from '../detail/detail';

import { HomePage } from '../home/home';
import { PopoverPage } from '../popover/popover';

/**
 * Generated class for the ContInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const SERVER_URL="http://52.172.133.188:3001/"
const SOCKET_SERVER_URL="ws://52.172.133.188:3001/"
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
"vesselDeparted":"Vessel Departed",
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
  "vesselUnloadingStarted","vesselUnloadingEnded","vesselLoadingStarted","vesselLoadingEnded","vesselDeparted"],
  ["containerDischarged","deliveryOrderIssued","billOfEntryRegistered","dutyPaid"],
  ["deliveryRequested","jobOrderIssued","containerLoadedInTruck","containerPortOut"]
]




@IonicPage({
  name: 'cis', segment: 'cis/:cid' 
})

@Component({
  selector: 'page-cont-info',
  templateUrl: 'cont-info.html',
})


export class ContInfoPage {

  all_toasts=[
        {link:"http://jsnksjnjk.com",msg:"jnjnkjn"},
        {link:"http://jsnksjnjk.com",msg:"jnjnkjn"}];
  user:any={};
  active_block=0;
  actual_active_block=0;

   file_upload_task=["viaRegistered","IGMFiled","registeredVesselDetails","billOfEntryRegistered"]

   FILE_CHECK_TASK=["BerthAllocated","immigrationCompletedFormalities","customsCompletedFormalities","PHOCompletedFormalities","otherAuth1CompletedFormalities","otherAuth2CompletedFormalities"]
  
  
   mySearchInput:String;
   searchActive:boolean=false;
   searchError:boolean=false;

  toDoTask=null;


  show_events=[
  ];

  vessel_list=[];

  vesselID="";
  containerID="";

  ws:any;

  number_of_notifications=0;

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController,public navParams: NavParams,private http: HttpClient,private storage: Storage) {

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


        if(this.navParams.get("cid")){
          this.containerID=this.navParams.get("cid");
        }
        else if(this.navParams.get("vessel")){
          this.vesselID=this.navParams.get("vessel");
        }else{
           this.vesselID="J0522";
        }

        if(this.containerID!=""){
          this.get_task_list_container();  
        }else{
            this.get_task_list_vessel();
        }

        this.http.get(OPEN_SERVER_URL+'api/org.hack.sagarmala.Vessel/').toPromise()
        .then(data=>{
            console.log(data)
            for (let v in data){
                if(this.vessel_list.indexOf(data[v].vesselID)<0)
                     this.vessel_list.push(data[v].vesselID)
            }
        }).catch(err=>console.log(err))

        this.http.get(OPEN_SERVER_URL+'api/queries/getTasksForParticipant?assigneeParam='+this.user.username).toPromise()
        .then(data=>{
            for(let tsk in data){
              if(data[tsk].finished)
              continue;  
              this.number_of_notifications++; 
            }
        }).catch(()=>{})
    
            
    });
    this.connect_ws();
      console.log('ionViewDidLoad ContInfoPage');


    
  }


/**
    This is the function that is called when the WebSocket connects
    to the server.
*/
     handleConnected(data) {
    // Create a log message which explains what has happened and includes
    // the url we have connected too.
    var logMsg = 'Connected to server: ' + data.target.url;
    // Add the message to the log.
    console.log(logMsg)
    }

/**
    This is the function that is called when an error occurs with our
    WebSocket.
*/
    handleError(err) {
        // Print the error to the console so we can debug it.
        console.log("Error: ", err);
    }

   connect_ws() {
    // Create a new WebSocket to the SERVER_URL (defined above). The empty
    // array ([]) is for the protocols, which we are not using for this
    // demo.
    var self = this;

    this.ws = new WebSocket(SOCKET_SERVER_URL, []);
    // Set the function to be called when a message is received.
    this.ws.onmessage = function(data) {
      // Simply call logMessage(), passing the received data.
      console.log(JSON.parse(data.data));
      //self.all_toasts.push({link:"http://jsnksjnjk.com",msg:"new event"});
 
      self.handleSocketMessage(data.data);
     };
    // Set the function to be called when we have connected to the server.
    this.ws.onopen = this.handleConnected;
    // Set the function to be called when an error occurs.
    this.ws.onerror = this.handleError;
  }  

  make_active(ind){
    this.active_block=ind;
  }

  goToMApPage(){
    this.navCtrl.push(HomePage)
  }

  vesselLeftClick(id){
      console.log(id);
      this.navCtrl.setRoot(ContInfoPage, {
        vessel:id
      })    

  }

  handleSocketMessage(task){
  
    if(this.containerID!="" && task["$class"]!="org.hack.sagarmala.TaskAllotmentEvent" ){
      this.active_block=0;
      this.actual_active_block=0;    
      this.toDoTask=null;  
      this.show_events=[];
        console.log(task["$class"])
      this.get_task_list_container();  
    }else if(task["$class"]!="org.hack.sagarmala.TaskAllotmentEvent"){
      this.active_block=0;
      this.actual_active_block=0;    
      this.toDoTask=null;  
      this.show_events=[];
        console.log(task["$class"])
        this.get_task_list_vessel();
    }

/*    if(task["$class"]=="org.hack.sagarmala.TaskAllotmentEvent" && task["assigneeID"]==this.user.username){
        let assgn_task=task["task"];
        let task_id=assgn_task.split("#")[1];
        this.all_toasts.push({link:"http://jsnksjnjk.com",msg:"jnjnkjn"});
    }
*/
  }

  presentPopover(myEvent) {
    this.http.get(OPEN_SERVER_URL+'api/queries/getTasksForParticipant?assigneeParam='+this.user.username).toPromise()
    .then(data=>{
      let inp_data=[];
      for(let tsk in data){     
          let task=data[tsk];
          console.log(task);  
          if(task.finished)
            continue;
          if(task["containerID"]!=undefined && task["containerID"]!="")   
              inp_data.push({contId:task["containerID"],msg:task.transactionId+" for "+task["containerID"]!});
          else
              inp_data.push({vesselId:task["vesselID"],msg:task["transactionId"]+" for "+task["vesselID"]!});
        }
      let popover = this.popoverCtrl.create(PopoverPage,{data:inp_data});
      popover.present({
        ev: myEvent
      });
    }).catch(err=>console.log(err))
            

  }  



  search() { 
    this.searchError=false;  
    this.searchActive=true; 

    this.http.get(OPEN_SERVER_URL+'api/org.hack.sagarmala.Container/'+this.mySearchInput).toPromise()
    .then((res)=>{ //CONTAINER FOUND
        console.log(res);
        this.navCtrl.setRoot(ContInfoPage, {
          cid:this.mySearchInput 
        })    
        return null;
    }).catch(err=>{ //CONTAINER NOT FOUND
        console.log("not container")
        this.http.get(OPEN_SERVER_URL+'api/org.hack.sagarmala.Vessel/'+this.mySearchInput).toPromise()
        .then((res)=>{ //VESSEL FOUND
          console.log(res);
          this.navCtrl.setRoot(ContInfoPage, {
            vessel:this.mySearchInput 
          })    
        }).catch(err=>{ //VESSEL NOT FOUND
          console.log("not vessel")
          this.searchActive=false; 
          this.searchError=true;  
        })
    
    })
  
      console.log("search starting")
  }


  uploadDocument(){
    
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');


    let options={
      headers:headers
    }

    let opts={};
    if(this.file_upload_task.indexOf(this.toDoTask)>=0){
      if(this.toDoTask=="billOfEntryRegistered"){
        opts={container:"resource:org.hack.sagarmala.Container#"+this.containerID};
      }else{
        opts={vessel:"resource:org.hack.sagarmala.Vessel#"+this.vesselID,file_path:"jknkn"};
      }
    }else if(this.toDoTask=="BerthAllocated"){
      opts={vessel:"resource:org.hack.sagarmala.Vessel#"+this.vesselID,berth:"jknkn"};
    }else if(this.vesselID!=""){
      opts={vessel:"resource:org.hack.sagarmala.Vessel#"+this.vesselID};
    }else if(this.containerID!=""){
      opts={container:"resource:org.hack.sagarmala.Container#"+this.containerID};
    }
    
    this.http.post(SERVER_URL+'api/'+this.toDoTask+"?access_token="+this.user.id,opts,options).toPromise()
    .then(data=>{
          console.log(data)
//          return;
          if(this.vesselID!=""){
            this.navCtrl.push(ContInfoPage,{
              vessel:this.vesselID 
            });
          }
          if(this.containerID!=""){
            this.navCtrl.push(ContInfoPage,{
              cid:this.containerID 
            });
          }
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

  process_task_data(data,active_events=true){
//    console.log(data)
    for(let i in data){
      if(data[i].transactionId=="vesselDeparted"){
        continue; 
      }
//      console.log(data[i]);
      let block=0;
      this.active_block=0;

      for(let j=0;j<BLOCKS.length;j++){
        if(BLOCKS[j].indexOf(data[i].transactionId)>=0){
           block=j;
           break;
        }
      }
//            console.log(this.active_block)

    if(block>this.active_block){
        this.active_block=block;
        this.actual_active_block=this.active_block; 
      }


      let task={
        "id":data[i].transactionId,
        "name":MAPPING[data[i].transactionId],
        "group":"preberth",
        "date":data[i].completed_at!=undefined?data[i].completed_at:data[i].created_at,
        "status":data[i].finished?"finished":"pending",
        "assigneeID":data[i].assigneeID
      };
      let task_exists=false;
      for(let se in this.show_events[block]){
        if(this.show_events[block][se].id==task.id)
          task_exists=true;
      }

      if(task_exists)
          continue;

      if(this.show_events[block]!==undefined)
          this.show_events[block].push(task);
      else
          this.show_events[block]=[task];

      if(active_events && this.toDoTask==null && data[i].assigneeID===this.user.username && !data[i].finished){
        this.toDoTask=data[i].transactionId;
      }

    }
    console.log("hjbhjbhj")
    console.log(this.show_events)

  }


  get_task_list_vessel(){
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

  
    this.http.get(OPEN_SERVER_URL+'api/queries/getTasksForVessel?vesselParam='+this.vesselID,options).toPromise()
    .then(data=>{

        this.process_task_data(data);


    }
    ,err=>{
          console.log(err)
    }
    )
  
  }

 

  get_task_list_container(){
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    this.http.get(OPEN_SERVER_URL+'api/org.hack.sagarmala.Container/'+this.containerID).toPromise()
    .then((res)=>{ //CONTAINER FOUND
        let vesselID=res['vesselID'];
//        console.log(res);
//        console.log(vesselID);
        this.http.get(OPEN_SERVER_URL+'api/queries/getTasksForVessel?vesselParam='+vesselID).toPromise()
        .then(data=>{
          this.process_task_data(data,false);          
          return  this.http.get(OPEN_SERVER_URL+'api/queries/getTasksForContainer?contParam='+this.containerID).toPromise();
        })
        .then(data=>{
          this.process_task_data(data);
        })
        .catch(err=>console.log(err))
    })
    .catch(err=>{ //CONTAINER NOT FOUND
    })

  }


}

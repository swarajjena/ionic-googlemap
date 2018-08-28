import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
declare var google;

const routes=[
  Object.freeze({lt:18.95223943874775,lg:72.96419620513916}),
  Object.freeze({lt:18.9528076822081,lg:72.95938968658447}),
  Object.freeze({lt:18.94923583402353,lg:72.95640707015991}),
  Object.freeze({lt:18.95374122083436,lg:72.94615030288695}),
  Object.freeze({lt:18.952543855127896,lg:72.94550657272339}),
  Object.freeze({lt:18.95000703498977,lg:72.95108556747435}),
  Object.freeze({lt:18.946435126858272,lg:72.9484462738037}),
  Object.freeze({lt:18.94759194638469,lg:72.94587135314941}),
  Object.freeze({lt:18.949864971921688,lg:72.9430603981018}),
  Object.freeze({lt:18.946353946239544,lg:72.93973445892334}),
  Object.freeze({lt:18.941970134197152,lg:72.94488430023193}),
  Object.freeze({lt:18.93941285734333,lg:72.94874668121338}),
  Object.freeze({lt:18.93815450038627,lg:72.94861793518066}),
  Object.freeze({lt:18.93592698236181,lg:72.95059740543365})
];

//Object.freeze(routes);

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})

export class HomePage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  infowindow:any;

  moving_truck=[
    {cur_loc:{lat:18.952462677480824,lng:72.96023726463318},destination:1},
    {cur_loc:{lat:18.950453518130693,lng:72.9538106918335},destination:3},
    {cur_loc:{lat:18.948789347624615,lng:72.95020580291748},destination:6}
  ];

  infoz="heellow "

  moving_truck_marker=[];

 
  constructor(public navCtrl: NavController,public alertCtrl: AlertController) {
    setInterval(function(){
      this.moving_truck.push({cur_loc:{lat:18.952462677480824,lng:72.96023726463318},destination:1})
      let marker = new google.maps.Marker({
        position: {lat:18.95284827095263,lng:72.96029090881346},
        map: this.map,
        title: 'Hello World!',
        icon: "./truck.png"
      });
      this.moving_truck_marker.push(marker);
    }.bind(this),15000)
   
  }
 
  ionViewDidLoad(){
    this.loadMap();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Low battery',
      subTitle: '10% of battery remaining',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: 'Do you want to buy this book?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

   makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVXYZ123456789";
  
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }


  getContainerInfo(contId){
    let html="<h3>ID : L"+contId+"</h3>"+
            "<table border='1' class=\"info-window-table\">"+
            " <tr> <th>Row</th> <th>Container No</th> </tr>"+
            " <tr> <td>Row 1</td> <td>"+this.makeid()+"</td> </tr>"+
            " <tr> <td>Row 2</td> <td>"+this.makeid()+"</td> </tr> "+
            "<tr> <td>Row 3</td> <td>"+this.makeid()+"</td> </tr> "+
            "<tr> <td>Row 4</td> <td>"+this.makeid()+"</td> </tr>"+
            " <tr> <td>Row 5</td> <td>"+this.makeid()+"</td> </tr> "+
            "</table>"+
            "<div style='visibility:hidden'>jhbbjhbjhbjhbjhbbj</div>"
      return html;
    
  }
 
  loadMap(){
 
    let latLng = new google.maps.LatLng(18.950805976030396,72.953268081665);
 
    let mapOptions = {
      center: latLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.infowindow = new google.maps.InfoWindow();
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.map.data.loadGeoJson('./google.json');
    this.map.data.loadGeoJson('./google2.json');


    // When the user clicks, open an infowindow
    this.map.data.addListener('click', function(event) {
      if(event.feature.getProperty("yard")){
        this.infowindow.setContent("<div style='width:150px;height:100px'><h2>"+event.feature.getProperty("yard")+"</h2>Capacity: 80/100</div>");
      }else if(event.feature.getProperty("container")){
        this.infowindow.setContent(this.getContainerInfo(event.feature.getProperty("no")));
      }else if(event.feature.getProperty("trailer")){
        this.infowindow.setContent("<div style='width:150px;height:100px'><h3>Truck</h3>Reg No : MH 0"+Math.ceil(Math.random()*8 )+"CE"+Math.floor(Math.random()*9999 )+" <br/>Port In: 21st July,7.30AM</div>");
      }else if(event.feature.getProperty("rmg_crane")){
        this.infowindow.setContent("<div style='width:200px;height:100px'><h3>RMG Crane</h3>Next Maintainance: 29st July</div>");
      }else if(event.feature.getProperty("sts_crane") && event.feature.getProperty("maintainance")){
        this.infowindow.setContent("<div style='width:200px;height:100px;color:#F00'><h3>STS Crane</h3>Estimated repair time: 29st July</div>");
      }else if(event.feature.getProperty("sts_crane") && !event.feature.getProperty("maintainance")){
        this.infowindow.setContent("<div style='width:200px;height:100px'><h3>STS Crane</h3>Next Maintainance: 29st July</div>");
      }
//      var myHTML = event.feature.getProperty("description");
  //    this.infowindow.setContent("<div style='width:150px;height:100px'>"+myHTML+"</div>");
      // position the infowindow on the marker
      this.infowindow.setPosition(event.latLng);
      // anchor the infowindow on the marker
//      this.infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
      this.infowindow.open(this.map);
    }.bind(this));    

    this.map.data.setStyle(function(feature) {
      var fillColor= '#A1D9FF';
      var strokeColor= '#A1D9FF';
      var strokeWeight= 0;
      if (feature.getProperty('map-hide')) {
        fillColor="#A1D9FF";
        strokeColor= "#A1D9FF"
        strokeWeight= 0;
        return /** @type {!google.maps.Data.StyleOptions} */({
          fillColor: fillColor,
          fillOpacity:1,
          strokeColor: strokeColor,
          strokeWeight: 1,
          "saturation": -100 
        });
      }else if (feature.getProperty('container')) {
        strokeColor= "#555555";
        strokeWeight= 1;
        var stroke_opacity=2;
        fillColor= "#555555";
        var fill_opacity = 0.2;
        return /** @type {!google.maps.Data.StyleOptions} */({
          fillColor: fillColor,
          fillOpacity:fill_opacity,
          strokeColor: strokeColor,
          strokeWeight: strokeWeight,
          "saturation": -100 
        });
      }else if (feature.getProperty('vessel')) {
        strokeColor= "#555555";
        strokeWeight= 1;
        var stroke_opacity=2;
        fillColor= "#555555";
        var fill_opacity = 0.6;
        return /** @type {!google.maps.Data.StyleOptions} */({
          fillColor: fillColor,
          fillOpacity:fill_opacity,
          strokeColor: strokeColor,
          strokeOpacity:stroke_opacity,
          strokeWeight: strokeWeight,
          "saturation": -100 
        });
      }else if (feature.getProperty('yard')) {
        strokeColor= "#555555";
        strokeWeight= 1;
        var stroke_opacity=0.5;
        fillColor= "#B7D8B5";
        var fill_opacity = 0.1;
        return /** @type {!google.maps.Data.StyleOptions} */({
          fillColor: fillColor,
          fillOpacity:fill_opacity,
          strokeOpacity:stroke_opacity,
          strokeColor: strokeColor,
          strokeWeight: strokeWeight,
          "saturation": -100 
        });
      }else if(feature.getProperty('trailer')){
        if(feature.getProperty('maintainance')){
          return {
            icon: "./truck.png"
          };  
        }else{
          return {
            icon: "./truck.png"
          };  
        }
      }else if(feature.getProperty('sts_crane')){
        if(feature.getProperty('maintainance')){
          return {
            icon: "./sts_crane_maintainance.png"
          };  
        }else{
          return {
            icon: "./sts_crane.png"
          };
        }
      }else if(feature.getProperty('rmg_crane')){
        if(feature.getProperty('maintainance')){
          return {
            icon: "./rmg_crane.png"
          };
          }else{
            return {
              icon: "./rmg_crane.png"
            };
          }
      }else if(feature.getProperty('rtg_crane')){
        return {
          icon: "./rmg_crane.png"
        };
      }


      
    });
 // Bounds for North America
 var strictBounds = new google.maps.LatLngBounds(
  new google.maps.LatLng(18.931226648208464,72.9463101043701),
  new google.maps.LatLng(18.950285900492878,72.96394206237793));
 
  // Listen for the dragend event
  this.map.addListener('dragend', function () {
      console.log(this.map.getCenter())
      if (strictBounds.contains(this.map.getCenter())) return;
 
      // We're out of bounds - Move the map back within the bounds
 
      var c = this.map.getCenter(),
          x = c.lng(),
          y = c.lat(),
          maxX = strictBounds.getNorthEast().lng(),
          maxY = strictBounds.getNorthEast().lat(),
          minX = strictBounds.getSouthWest().lng(),
          minY = strictBounds.getSouthWest().lat();
 
      if (x < minX) x = minX;
      if (x > maxX) x = maxX;
      if (y < minY) y = minY;
      if (y > maxY) y = maxY;
 
      this.map.setCenter(new google.maps.LatLng(y, x));
  }.bind(this));

 // Limit the zoom level
 this.map.addListener('zoom_changed', function () {
  if (this.map.getZoom() < 15) 
      this.map.setZoom(15);
  }.bind(this));  

 
    this.map.data.addListener('click', function(event) {
      console.log(event.feature)
  });      


  for (let i=0;i<this.moving_truck.length;i++){
      let marker = new google.maps.Marker({
        position: this.moving_truck[i].cur_loc,
        map: this.map,
        title: 'Hello World!',
        icon: "./truck.png"
      });
      this.moving_truck_marker.push(marker);
  }

  setTimeout(this.moveTruck.bind(this),1000);



  }

  moveTruck(){
      for (let i in this.moving_truck){
          
          let ct=this.moving_truck[i].cur_loc;
          let dst=routes[this.moving_truck[parseInt(i)].destination];
//          if(parseInt(i)==0)
  //        console.log(i+" : "+this.moving_truck[parseInt(i)].destination+" : "+dst.lat+routes[3].lat)

          let dist=Math.sqrt((dst.lt-ct.lat)*(dst.lt-ct.lat)+(dst.lg-ct.lng)*(dst.lg-ct.lng));

          if(dist<0.00005){
            if(this.moving_truck[i].destination===(routes.length-1)){

//              this.moving_truck.splice(i,1);              
              this.moving_truck_marker[i].setMap(null);
  //            this.moving_truck_marker.splice(i,1);              
            }else{
              let cl=routes[this.moving_truck[i].destination];
              this.moving_truck[i].cur_loc={lat:cl.lt,lng:cl.lg}
              this.moving_truck[i].destination++;
              console.log("i:"+i+" = "+ this.moving_truck[i].destination +dst.lt+routes[3].lt)
            }
          }else{

            let speed=(Math.floor(Math.random() * 3)+1)*0.00001; 

            this.moving_truck[i].cur_loc.lat=this.moving_truck[i].cur_loc.lat+(((dst.lt-ct.lat)/dist)*speed);
            this.moving_truck[i].cur_loc.lng=this.moving_truck[i].cur_loc.lng+(((dst.lg-ct.lng)/dist)*speed);
            this.moving_truck_marker[i].setPosition(this.moving_truck[i].cur_loc);
          }
//          console.log(dist);


      }
          setTimeout(this.moveTruck.bind(this),50);
  }
}
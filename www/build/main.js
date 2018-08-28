webpackJsonp([0],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cont_info_cont_info__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SERVER_URL = "http://52.172.133.188:3001/";
var DetailPage = /** @class */ (function () {
    function DetailPage(navCtrl, navParams, http, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.registerCredentials = { username: '', password: '' };
    }
    DetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad DetailPage');
        this.storage.get("user").then(function (data) {
            var time_diff = new Date().getTime() - new Date(data.created).getTime();
            console.log(time_diff);
            if (time_diff > 3600000) {
            }
            else {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__cont_info_cont_info__["a" /* ContInfoPage */]);
            }
        });
    };
    DetailPage.prototype.login = function () {
        var _this = this;
        var options = {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        this.http.post(SERVER_URL + 'api/users/login', "username=" + this.registerCredentials.username + "&password=" + this.registerCredentials.password, options).toPromise()
            .then(function (data) {
            console.log(data);
            data["username"] = _this.registerCredentials.username;
            _this.storage.set("user", data).then(function () {
                _this.storage.get("user").then(function (data) {
                    console.log(data);
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__cont_info_cont_info__["a" /* ContInfoPage */]);
                });
            });
        }, function (err) {
            console.log(err);
        });
    };
    DetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-detail',template:/*ion-inline-start:"/Users/swarajjena/sagarmala/ionic-maps/src/pages/detail/detail.html"*/'<!--\n  Generated template for the DetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n	\n<ion-content  class="login-content" padding>\n  <ion-row class="logo-row">\n    <ion-col></ion-col>\n    <ion-col width-67>\n    </ion-col>\n    <ion-col></ion-col>\n  </ion-row>\n  <div class="login-box">\n    <form (ngSubmit)="login()" #registerForm="ngForm">\n      <ion-row>\n        <ion-col>\n          <ion-list inset>\n            \n            <ion-item>\n              <ion-input type="text" placeholder="username" name="username" [(ngModel)]="registerCredentials.username" required></ion-input>\n            </ion-item>\n            \n            <ion-item>\n              <ion-input type="password" placeholder="Password" name="password" [(ngModel)]="registerCredentials.password" required></ion-input>\n            </ion-item>\n            \n          </ion-list>\n        </ion-col>\n      </ion-row>\n      \n      <ion-row>\n        <ion-col class="signup-col">\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.form.valid">Login</button>\n        </ion-col>\n      </ion-row>\n      \n    </form>\n  </div>\n</ion-content>'/*ion-inline-end:"/Users/swarajjena/sagarmala/ionic-maps/src/pages/detail/detail.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _d || Object])
    ], DetailPage);
    return DetailPage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=detail.js.map

/***/ }),

/***/ 113:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 113;

/***/ }),

/***/ 155:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 155;

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__detail_detail__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ContInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SERVER_URL = "http://52.172.133.188:3001/";
var OPEN_SERVER_URL = "http://52.172.133.188:4000/";
var MAPPING = {
    "viaRegistered": "VIA is registered by VOA",
    "IGMFiled": "VOA files Import General Manifest",
    "registeredVesselDetails": "Registration of vessel details by VOA",
    "requestedBerthAllocation": "Berth allotment request by VOA",
    "BerthAllocated": "Berth allotment by Port Authority",
    "immigrationCompletedFormalities": "Immigration to complete formalities",
    "customsCompletedFormalities": "Customs to complete formalities",
    "PHOCompletedFormalities": "PHO to complete formalities",
    "otherAuth1CompletedFormalities": "Other formality 1",
    "otherAuth2CompletedFormalities": "Other formality 2",
    "vesselUnloadingStarted": "Start of vessels unloading",
    "vesselUnloadingEnded": "End of vessels unloading",
    "vesselLoadingStarted": "Start of vessels loading",
    "vesselLoadingEnded": "End of vessels loading",
    "containerDischarged": "Container discharged",
    "deliveryOrderIssued": "Issue Delivery Order",
    "billOfEntryRegistered": "Bill Registration",
    "dutyPaid": "Pay Duty",
    "deliveryRequested": "Request delivery of containers",
    "jobOrderIssued": "Issue Job order ",
    "containerLoadedInTruck": "Container to be located and loaded",
    "containerPortOut": "Port Out with loaded container"
};
var BLOCKS = [
    ["viaRegistered", "IGMFiled", "registeredVesselDetails", "requestedBerthAllocation", "BerthAllocated"],
    ["immigrationCompletedFormalities", "customsCompletedFormalities", "PHOCompletedFormalities", "otherAuth1CompletedFormalities", "otherAuth2CompletedFormalities",
        "vesselUnloadingStarted", "vesselUnloadingEnded", "vesselLoadingStarted", "vesselLoadingEnded"],
    ["containerDischarged", "deliveryOrderIssued", "billOfEntryRegistered", "dutyPaid"],
    ["deliveryRequested", "jobOrderIssued", "containerLoadedInTruck", "containerPortOut"]
];
var ContInfoPage = /** @class */ (function () {
    function ContInfoPage(navCtrl, navParams, http, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.user = {};
        this.active_block = 0;
        this.show_events = [];
        this.vesselID = "";
        this.containerID = "";
    }
    ContInfoPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.storage.get("user").then(function (data) {
            var time_diff = new Date().getTime() - new Date(data.created).getTime();
            console.log(time_diff);
            if (time_diff < 3600000) {
                _this.user = data;
            }
            else {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__detail_detail__["a" /* DetailPage */]);
            }
            if (_this.navParams.get("container")) {
                _this.containerID = _this.navParams.get("container");
            }
            else if (_this.navParams.get("vessel")) {
                _this.vesselID = _this.navParams.get("vessel");
            }
            else {
                _this.vesselID = "VESSEL1";
            }
            if (_this.containerID != "") {
            }
            else {
                _this.get_task_list_vessel();
            }
        });
        console.log('ionViewDidLoad ContInfoPage');
    };
    ContInfoPage.prototype.make_active = function (ind) {
        this.active_block = ind;
    };
    ContInfoPage.prototype.get_task_list_vessel = function () {
        var _this = this;
        var options = {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/x-www-form-urlencoded')
        };
        var access_tiken = "withCredentials=true&access_token=" + this.user.id;
        this.http.get(OPEN_SERVER_URL + 'api/queries/getTasksForVessel?vesselParam=VESSEL1', options).toPromise()
            .then(function (data) {
            for (var i in data) {
                console.log(data[i]);
                var block = 0;
                _this.active_block = 0;
                for (var j = 0; j < BLOCKS.length; j++) {
                    if (BLOCKS[j].indexOf(data[i].transactionId) >= 0) {
                        block = j;
                        break;
                    }
                }
                console.log(_this.active_block);
                if (block > _this.active_block)
                    _this.active_block = block;
                var task = {
                    "id": data[i].transactionId,
                    "name": MAPPING[data[i].transactionId],
                    "group": "preberth",
                    "date": data[i].completed_at != undefined ? data[i].completed_at : data[i].created_at,
                    "status": data[i].finished ? "finished" : "pending"
                };
                if (_this.show_events[block] !== undefined)
                    _this.show_events[block].push(task);
                else
                    _this.show_events[block] = [task];
            }
        }, function (err) {
            console.log(err);
        });
    };
    ContInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cont-info',template:/*ion-inline-start:"/Users/swarajjena/sagarmala/ionic-maps/src/pages/cont-info/cont-info.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Dashboard\n    </ion-title>\n\n\n    <ion-buttons end>\n      <button ion-button (click)="addMarker()" style="    background: #FFF;color: #ab00b5;">CONTAINER INFORMATION SYSTEM</button>\n      <a href="http://localhost:3000/dashboard"><button ion-button>MAP OPERATIONS</button></a>\n      <button ion-button (click)="addMarker()">PORT OPERATIONS</button>\n      <button ion-button (click)="addMarker()">TRANSPORT</button>\n      <button id="notification-button" ion-button end>\n        <ion-icon name="notifications">\n          <ion-badge id="notifications-badge" color="danger">5</ion-badge>\n        </ion-icon>              \n    </button>\n    </ion-buttons> \n  </ion-navbar>\n</ion-header>\n \n<ion-content>\n\n    <ion-searchbar\n    [(ngModel)]="myInput"\n    [showCancelButton]="shouldShowCancel"\n   \n   >\n  </ion-searchbar>\n\n    <div class="HorizontalNonLinearAlternativeLabelStepper">\n      <div class="HorizontalNonLinearAlternativeLabelStepper_cont" [ngClass]="{\'Stepper_active\' : active_block>=0}" (click)="make_active(0)">\n        <span class="HorizontalNonLinearAlternativeLabelStepper-stepImgSpan-215">PreBerthing</span>\n        <img src="images/PreBerthingIcon.png" width="80" height="80">\n      </div>\n      <div class="HorizontalNonLinearAlternativeLabelStepper-stepImgArw-216" [ngClass]="{\'Stepper_active\' : active_block>0}">\n        <img src="images/ArrowIcon.svg" width="80" height="80">\n      </div>\n      <div class="HorizontalNonLinearAlternativeLabelStepper_cont" [ngClass]="{\'Stepper_active\' : active_block>=1}" (click)="make_active(1)">\n        <span class="HorizontalNonLinearAlternativeLabelStepper-stepImgSpan-215" >Berthing</span>\n        <img src="images/BerthingIcon.png" width="80" height="80">\n      </div>\n      <div class="HorizontalNonLinearAlternativeLabelStepper-stepImgArw-216" [ngClass]="{\'Stepper_active\' : active_block>1}">\n          <img src="images/ArrowIcon.svg" width="80" height="80">\n      </div>\n      <div class="HorizontalNonLinearAlternativeLabelStepper_cont" [ngClass]="{\'Stepper_active\' : active_block>=2}" (click)="make_active(2)">\n        <span class="HorizontalNonLinearAlternativeLabelStepper-stepImgSpan-215">Container Yard</span>\n        <img src="images/ContainerYardIcon.png" width="80" height="80">\n      </div>\n      <div class="HorizontalNonLinearAlternativeLabelStepper-stepImgArw-216" [ngClass]="{\'Stepper_active\' : active_block>2}">\n        <img src="images/ArrowIcon.svg" width="80" height="80">\n      </div>\n      <div class="HorizontalNonLinearAlternativeLabelStepper_cont">\n        <span class="HorizontalNonLinearAlternativeLabelStepper-stepImgSpan-215" [ngClass]="{\'Stepper_active\' : active_block===3}" (click)="make_active(3)">Port Out</span>\n        <img src="images/PortOutIcon.svg" width="80" height="80">\n      </div>\n    </div>\n\n<div class="timeline">\n  <div   *ngFor="let evnt of   show_events[active_block]">\n    <div class="container right" [ngClass]="{\'red_border\' : evnt.status!==\'finished\'}">\n        <div class="content">\n          <h2>{{evnt.name}}</h2>\n          <p>{{evnt.status!==\'finished\'?"Created at ":"Finished at "}}{{evnt.date | date: \'H:mm dd/MM/yyyy \' }} </p>\n        </div>\n      </div>                                     \n  </div>\n\n      \n</div>\n\n\n</ion-content>'/*ion-inline-end:"/Users/swarajjena/sagarmala/ionic-maps/src/pages/cont-info/cont-info.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _d || Object])
    ], ContInfoPage);
    return ContInfoPage;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=cont-info.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(221);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_detail_detail__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_cont_info_cont_info__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_detail_detail__["a" /* DetailPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_cont_info_cont_info__["a" /* ContInfoPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_detail_detail__["a" /* DetailPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_cont_info_cont_info__["a" /* ContInfoPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_detail_detail__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_detail_detail__["a" /* DetailPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/swarajjena/sagarmala/ionic-maps/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/swarajjena/sagarmala/ionic-maps/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var routes = [
    Object.freeze({ lt: 18.95223943874775, lg: 72.96419620513916 }),
    Object.freeze({ lt: 18.9528076822081, lg: 72.95938968658447 }),
    Object.freeze({ lt: 18.94923583402353, lg: 72.95640707015991 }),
    Object.freeze({ lt: 18.95374122083436, lg: 72.94615030288695 }),
    Object.freeze({ lt: 18.952543855127896, lg: 72.94550657272339 }),
    Object.freeze({ lt: 18.95000703498977, lg: 72.95108556747435 }),
    Object.freeze({ lt: 18.946435126858272, lg: 72.9484462738037 }),
    Object.freeze({ lt: 18.94759194638469, lg: 72.94587135314941 }),
    Object.freeze({ lt: 18.949864971921688, lg: 72.9430603981018 }),
    Object.freeze({ lt: 18.946353946239544, lg: 72.93973445892334 }),
    Object.freeze({ lt: 18.941970134197152, lg: 72.94488430023193 }),
    Object.freeze({ lt: 18.93941285734333, lg: 72.94874668121338 }),
    Object.freeze({ lt: 18.93815450038627, lg: 72.94861793518066 }),
    Object.freeze({ lt: 18.93592698236181, lg: 72.95059740543365 })
];
//Object.freeze(routes);
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.moving_truck = [
            { cur_loc: { lat: 18.952462677480824, lng: 72.96023726463318 }, destination: 1 },
            { cur_loc: { lat: 18.950453518130693, lng: 72.9538106918335 }, destination: 3 },
            { cur_loc: { lat: 18.948789347624615, lng: 72.95020580291748 }, destination: 6 }
        ];
        this.infoz = "heellow ";
        this.moving_truck_marker = [];
        setInterval(function () {
            this.moving_truck.push({ cur_loc: { lat: 18.952462677480824, lng: 72.96023726463318 }, destination: 1 });
            var marker = new google.maps.Marker({
                position: { lat: 18.95284827095263, lng: 72.96029090881346 },
                map: this.map,
                title: 'Hello World!',
                icon: "./truck.png"
            });
            this.moving_truck_marker.push(marker);
        }.bind(this), 15000);
    }
    HomePage.prototype.ionViewDidLoad = function () {
        this.loadMap();
    };
    HomePage.prototype.presentAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Low battery',
            subTitle: '10% of battery remaining',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    HomePage.prototype.presentConfirm = function () {
        var alert = this.alertCtrl.create({
            title: 'Confirm purchase',
            message: 'Do you want to buy this book?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Buy',
                    handler: function () {
                        console.log('Buy clicked');
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.makeid = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVXYZ123456789";
        for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    };
    HomePage.prototype.getContainerInfo = function (contId) {
        var html = "<h3>ID : L" + contId + "</h3>" +
            "<table border='1' class=\"info-window-table\">" +
            " <tr> <th>Row</th> <th>Container No</th> </tr>" +
            " <tr> <td>Row 1</td> <td>" + this.makeid() + "</td> </tr>" +
            " <tr> <td>Row 2</td> <td>" + this.makeid() + "</td> </tr> " +
            "<tr> <td>Row 3</td> <td>" + this.makeid() + "</td> </tr> " +
            "<tr> <td>Row 4</td> <td>" + this.makeid() + "</td> </tr>" +
            " <tr> <td>Row 5</td> <td>" + this.makeid() + "</td> </tr> " +
            "</table>" +
            "<div style='visibility:hidden'>jhbbjhbjhbjhbjhbbj</div>";
        return html;
    };
    HomePage.prototype.loadMap = function () {
        var latLng = new google.maps.LatLng(18.950805976030396, 72.953268081665);
        var mapOptions = {
            center: latLng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.infowindow = new google.maps.InfoWindow();
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.map.data.loadGeoJson('./google.json');
        this.map.data.loadGeoJson('./google2.json');
        // When the user clicks, open an infowindow
        this.map.data.addListener('click', function (event) {
            if (event.feature.getProperty("yard")) {
                this.infowindow.setContent("<div style='width:150px;height:100px'><h2>" + event.feature.getProperty("yard") + "</h2>Capacity: 80/100</div>");
            }
            else if (event.feature.getProperty("container")) {
                this.infowindow.setContent(this.getContainerInfo(event.feature.getProperty("no")));
            }
            else if (event.feature.getProperty("trailer")) {
                this.infowindow.setContent("<div style='width:150px;height:100px'><h3>Truck</h3>Reg No : MH 0" + Math.ceil(Math.random() * 8) + "CE" + Math.floor(Math.random() * 9999) + " <br/>Port In: 21st July,7.30AM</div>");
            }
            else if (event.feature.getProperty("rmg_crane")) {
                this.infowindow.setContent("<div style='width:200px;height:100px'><h3>RMG Crane</h3>Next Maintainance: 29st July</div>");
            }
            else if (event.feature.getProperty("sts_crane") && event.feature.getProperty("maintainance")) {
                this.infowindow.setContent("<div style='width:200px;height:100px;color:#F00'><h3>STS Crane</h3>Estimated repair time: 29st July</div>");
            }
            else if (event.feature.getProperty("sts_crane") && !event.feature.getProperty("maintainance")) {
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
        this.map.data.setStyle(function (feature) {
            var fillColor = '#A1D9FF';
            var strokeColor = '#A1D9FF';
            var strokeWeight = 0;
            if (feature.getProperty('map-hide')) {
                fillColor = "#A1D9FF";
                strokeColor = "#A1D9FF";
                strokeWeight = 0;
                return /** @type {!google.maps.Data.StyleOptions} */ ({
                    fillColor: fillColor,
                    fillOpacity: 1,
                    strokeColor: strokeColor,
                    strokeWeight: 1,
                    "saturation": -100
                });
            }
            else if (feature.getProperty('container')) {
                strokeColor = "#555555";
                strokeWeight = 1;
                var stroke_opacity = 2;
                fillColor = "#555555";
                var fill_opacity = 0.2;
                return /** @type {!google.maps.Data.StyleOptions} */ ({
                    fillColor: fillColor,
                    fillOpacity: fill_opacity,
                    strokeColor: strokeColor,
                    strokeWeight: strokeWeight,
                    "saturation": -100
                });
            }
            else if (feature.getProperty('vessel')) {
                strokeColor = "#555555";
                strokeWeight = 1;
                var stroke_opacity = 2;
                fillColor = "#555555";
                var fill_opacity = 0.6;
                return /** @type {!google.maps.Data.StyleOptions} */ ({
                    fillColor: fillColor,
                    fillOpacity: fill_opacity,
                    strokeColor: strokeColor,
                    strokeOpacity: stroke_opacity,
                    strokeWeight: strokeWeight,
                    "saturation": -100
                });
            }
            else if (feature.getProperty('yard')) {
                strokeColor = "#555555";
                strokeWeight = 1;
                var stroke_opacity = 0.5;
                fillColor = "#B7D8B5";
                var fill_opacity = 0.1;
                return /** @type {!google.maps.Data.StyleOptions} */ ({
                    fillColor: fillColor,
                    fillOpacity: fill_opacity,
                    strokeOpacity: stroke_opacity,
                    strokeColor: strokeColor,
                    strokeWeight: strokeWeight,
                    "saturation": -100
                });
            }
            else if (feature.getProperty('trailer')) {
                if (feature.getProperty('maintainance')) {
                    return {
                        icon: "./truck.png"
                    };
                }
                else {
                    return {
                        icon: "./truck.png"
                    };
                }
            }
            else if (feature.getProperty('sts_crane')) {
                if (feature.getProperty('maintainance')) {
                    return {
                        icon: "./sts_crane_maintainance.png"
                    };
                }
                else {
                    return {
                        icon: "./sts_crane.png"
                    };
                }
            }
            else if (feature.getProperty('rmg_crane')) {
                if (feature.getProperty('maintainance')) {
                    return {
                        icon: "./rmg_crane.png"
                    };
                }
                else {
                    return {
                        icon: "./rmg_crane.png"
                    };
                }
            }
            else if (feature.getProperty('rtg_crane')) {
                return {
                    icon: "./rmg_crane.png"
                };
            }
        });
        // Bounds for North America
        var strictBounds = new google.maps.LatLngBounds(new google.maps.LatLng(18.931226648208464, 72.9463101043701), new google.maps.LatLng(18.950285900492878, 72.96394206237793));
        // Listen for the dragend event
        this.map.addListener('dragend', function () {
            console.log(this.map.getCenter());
            if (strictBounds.contains(this.map.getCenter()))
                return;
            // We're out of bounds - Move the map back within the bounds
            var c = this.map.getCenter(), x = c.lng(), y = c.lat(), maxX = strictBounds.getNorthEast().lng(), maxY = strictBounds.getNorthEast().lat(), minX = strictBounds.getSouthWest().lng(), minY = strictBounds.getSouthWest().lat();
            if (x < minX)
                x = minX;
            if (x > maxX)
                x = maxX;
            if (y < minY)
                y = minY;
            if (y > maxY)
                y = maxY;
            this.map.setCenter(new google.maps.LatLng(y, x));
        }.bind(this));
        // Limit the zoom level
        this.map.addListener('zoom_changed', function () {
            if (this.map.getZoom() < 15)
                this.map.setZoom(15);
        }.bind(this));
        this.map.data.addListener('click', function (event) {
            console.log(event.feature);
        });
        for (var i = 0; i < this.moving_truck.length; i++) {
            var marker = new google.maps.Marker({
                position: this.moving_truck[i].cur_loc,
                map: this.map,
                title: 'Hello World!',
                icon: "./truck.png"
            });
            this.moving_truck_marker.push(marker);
        }
        setTimeout(this.moveTruck.bind(this), 1000);
    };
    HomePage.prototype.moveTruck = function () {
        for (var i in this.moving_truck) {
            var ct = this.moving_truck[i].cur_loc;
            var dst = routes[this.moving_truck[parseInt(i)].destination];
            //          if(parseInt(i)==0)
            //        console.log(i+" : "+this.moving_truck[parseInt(i)].destination+" : "+dst.lat+routes[3].lat)
            var dist = Math.sqrt((dst.lt - ct.lat) * (dst.lt - ct.lat) + (dst.lg - ct.lng) * (dst.lg - ct.lng));
            if (dist < 0.00005) {
                if (this.moving_truck[i].destination === (routes.length - 1)) {
                    //              this.moving_truck.splice(i,1);              
                    this.moving_truck_marker[i].setMap(null);
                    //            this.moving_truck_marker.splice(i,1);              
                }
                else {
                    var cl = routes[this.moving_truck[i].destination];
                    this.moving_truck[i].cur_loc = { lat: cl.lt, lng: cl.lg };
                    this.moving_truck[i].destination++;
                    console.log("i:" + i + " = " + this.moving_truck[i].destination + dst.lt + routes[3].lt);
                }
            }
            else {
                var speed = (Math.floor(Math.random() * 3) + 1) * 0.00001;
                this.moving_truck[i].cur_loc.lat = this.moving_truck[i].cur_loc.lat + (((dst.lt - ct.lat) / dist) * speed);
                this.moving_truck[i].cur_loc.lng = this.moving_truck[i].cur_loc.lng + (((dst.lg - ct.lng) / dist) * speed);
                this.moving_truck_marker[i].setPosition(this.moving_truck[i].cur_loc);
            }
            //          console.log(dist);
        }
        setTimeout(this.moveTruck.bind(this), 50);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], HomePage.prototype, "mapElement", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'home-page',template:/*ion-inline-start:"/Users/swarajjena/sagarmala/ionic-maps/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Dashboard\n    </ion-title>\n\n\n    <ion-buttons end>\n      <a href="http://localhost:3000/dashboard"><button ion-button>CONTAINER INFORMATION SYSTEM</button></a>\n      <button ion-button (click)="addMarker()" style="    background: #FFF;color: #ab00b5;">MAP OPERATIONS</button>\n      <button ion-button (click)="addMarker()">PORT OPERATIONS</button>\n      <button ion-button (click)="addMarker()">TRANSPORT</button>\n      <button id="notification-button" ion-button end>\n        <ion-icon name="notifications">\n          <ion-badge id="notifications-badge" color="danger">5</ion-badge>\n        </ion-icon>              \n    </button>\n    </ion-buttons> \n  </ion-navbar>\n</ion-header>\n \n<ion-content>\n  <div #map id="map"></div> \n</ion-content>'/*ion-inline-end:"/Users/swarajjena/sagarmala/ionic-maps/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

},[200]);
//# sourceMappingURL=main.js.map
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UsecardsPage } from '../pages/usecards/usecards';

import { DetailPage } from '../pages/detail/detail';
import { ContInfoPage } from '../pages/cont-info/cont-info';
import { PopoverPage } from '../pages/popover/popover';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    ContInfoPage,
    PopoverPage,
    UsecardsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{},{
      links: [
        { component: DetailPage, name: 'login', segment: 'login' },
        { component: HomePage, name: 'map', segment: 'map' },
        { component: UsecardsPage, name: 'cards', segment: 'cards' },
        { component: ContInfoPage, name: 'container', segment: 'container/:cid' , defaultHistory: [DetailPage]},
        { component: ContInfoPage, name: 'vessel', segment: 'vessel/:vessel' , defaultHistory: [DetailPage]},
        { component: ContInfoPage, name: 'vessel', segment: 'vessel' , defaultHistory: [DetailPage]}
      ]
    }
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage,
    ContInfoPage,
    PopoverPage,
    UsecardsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

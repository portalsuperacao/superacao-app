import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

// PROVIDERS
import { AngularFireModule } from 'angularfire2';
import { UserStorageService } from '../providers/database/user-storage-service';
import { DateUtil } from '../providers/util/date-util';
import { Utils } from '../providers/util/utils';

// PAGES
import { MyApp } from './app.component';
import { ApresentationPage } from '../pages/apresentation/apresentation';
import { CalendarPage } from '../pages/calendar/calendar';
import { ChatPage } from '../pages/chat/chat';
import { LoginPage } from '../pages/login/login';
import { MySpacePage } from '../pages/my-space/my-space';
import { ProfilePage } from '../pages/profile/profile';
import { StatusEmotionPage } from '../pages/status-emotion/status-emotion';
import { TabsPage } from '../pages/tabs/tabs';
import { OvercomerPage } from '../pages/trinity/overcomer/overcomer';
import { AngelPage } from '../pages/trinity/angel/angel';
import { ArchangelPage } from '../pages/trinity/archangel/archangel';
import * as firebase from 'firebase';


export const firebaseConfig = {
   apiKey: "AIzaSyAnTqOEZHBU-1CMx0fKY2v4zFeGvPnvA1I",
   authDomain: "superacao-dc62e.firebaseapp.com",
   databaseURL: "https://superacao-dc62e.firebaseio.com",
   storageBucket: "superacao-dc62e.appspot.com",
   messagingSenderId: "1018181753983"
};

firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [
    MyApp,
    ApresentationPage,
    CalendarPage,
    ChatPage,
    LoginPage,
    MySpacePage,
    ProfilePage,
    StatusEmotionPage,
    TabsPage,
    OvercomerPage,
    AngelPage,
    ArchangelPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ApresentationPage,
    CalendarPage,
    ChatPage,
    LoginPage,
    MySpacePage,
    ProfilePage,
    StatusEmotionPage,
    TabsPage,
    OvercomerPage,
    AngelPage,
    ArchangelPage
  ],
  providers: [
    UserStorageService,
    DateUtil,
    Utils
  ]
})
export class AppModule {}

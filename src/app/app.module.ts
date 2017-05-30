import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ENV } from '../config/environment.dev';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

// MODULES
import { AuthPageModule } from '../pages/auth/auth.module';

// COMPONENTS / PIPES / DIRECTIVES
import { CalendarPicker } from '../components/calendar-picker/calendar-picker';
import { DateCustomPipe } from '../pipes/date-custom-pipe';
import { TruncatePipe } from '../pipes/truncate-pipe';

// NATIVES
import { Calendar } from '@ionic-native/calendar';
import { Camera } from '@ionic-native/camera';
import { Facebook } from '@ionic-native/facebook';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Network } from '@ionic-native/network';
import { Push } from '@ionic-native/push';

// PROVIDERS
import { TextMaskModule } from 'angular2-text-mask';
import { AngularFireModule } from 'angularfire2';
import { AuthService } from '../providers/database/auth-service';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { UserStorageService } from '../providers/database/user-storage-service';
import { CalendarStorageService } from '../providers/database/calendar-storage-service';
import { ChatStorageService } from '../providers/database/chat-storage-service';
import { MySpaceStorageService } from '../providers/database/my-space-storage-service';
import { DateUtil } from '../providers/util/date-util';
import { Utils } from '../providers/util/utils';

// PAGES
import { MyApp } from './app.component';
import { CalendarPage } from '../pages/my-space/calendar/calendar';
import { CalendarNewEventPage } from '../pages/my-space/calendar/new-event/new-event'
import { CalendarEventEditPage } from '../pages/my-space/calendar/new-event/edit-event/edit-event';
import { CalendarEventQuestionsPage } from '../pages/my-space/calendar/new-event/edit-event/questions/questions';
import { CalendarPublicEventPage } from '../pages/my-space/calendar/public-event/public-event';
import { ChatPage } from '../pages/chat/chat';
import { HelpSystemAngelPage } from '../pages/help-system/angel/help-system-angel';
import { HelpSystemOvercomerPage } from '../pages/help-system/overcomer/help-system-overcomer';
import { LoginPage } from '../pages/login/login';
import { MySpacePage } from '../pages/my-space/my-space';
import { MySpaceDoctorsPage } from '../pages/my-space/doctors/doctors';
import { MySpaceDoctorsEventPage } from '../pages/my-space/doctors/event/doctors-event';
import { MySpaceMedicinesPage } from '../pages/my-space/medicines/medicines';
import { MySpaceMedicinesEventPage } from '../pages/my-space/medicines/event/medicines-event';
import { MySpaceNotesPage } from '../pages/my-space/notes/notes';
import { MySpaceNotesEventPage } from '../pages/my-space/notes/event/notes-event';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileEditPage } from '../pages/profile/edit/edit';
import { StatusEmotionPage } from '../pages/status-emotion/status-emotion';
import { TabsPage } from '../pages/tabs/tabs';

import { OvercomerPage } from '../pages/trinity/overcomer/overcomer';
import { AngelPage } from '../pages/trinity/angel/angel';
import { VisitorPage } from '../pages/trinity/visitor/visitor';
import * as firebase from 'firebase';

export const firebaseConfig = {
   apiKey: ENV.FIREBASE.apiKey,
   authDomain: ENV.FIREBASE.authDomain,
   databaseURL: ENV.FIREBASE.databaseURL,
   storageBucket: ENV.FIREBASE.storageBucket,
   messagingSenderId: ENV.FIREBASE.messagingSenderId
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    CalendarPage,
    CalendarNewEventPage,
    CalendarEventEditPage,
    CalendarEventQuestionsPage,
    CalendarPublicEventPage,
    ChatPage,
    HelpSystemAngelPage,
    HelpSystemOvercomerPage,
    LoginPage,
    MySpacePage,
    MySpaceDoctorsPage,
    MySpaceDoctorsEventPage,
    MySpaceMedicinesPage,
    MySpaceMedicinesEventPage,
    MySpaceNotesPage,
    MySpaceNotesEventPage,
    ProfilePage,
    ProfileEditPage,
    StatusEmotionPage,
    TabsPage,
    OvercomerPage,
    AngelPage,
    CalendarPicker,
    DateCustomPipe,
    TruncatePipe,
    VisitorPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    TextMaskModule,
    AuthPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CalendarPage,
    CalendarNewEventPage,
    CalendarEventEditPage,
    CalendarEventQuestionsPage,
    CalendarPublicEventPage,
    ChatPage,
    HelpSystemAngelPage,
    HelpSystemOvercomerPage,
    LoginPage,
    MySpacePage,
    MySpaceDoctorsPage,
    MySpaceDoctorsEventPage,
    MySpaceMedicinesPage,
    MySpaceMedicinesEventPage,
    MySpaceNotesPage,
    MySpaceNotesEventPage,
    ProfilePage,
    ProfileEditPage,
    StatusEmotionPage,
    TabsPage,
    OvercomerPage,
    AngelPage,
    VisitorPage
  ],
  providers: [
    // Natives
    SplashScreen,
    StatusBar,
    Calendar,
    Camera,
    Facebook,
    Geolocation,
    LocalNotifications,
    Network,
    Push,
    // Services
    AuthService,
    UserStorageService,
    CalendarStorageService,
    ChatStorageService,
    DateUtil,
    MySpaceStorageService,
    Utils,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

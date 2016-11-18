import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

// COMPONENTS / PIPES / DIRECTIVES
import { CalendarPicker } from '../components/calendar-picker/calendar-picker';
import { DateCustomPipe } from '../pipes/date-custom-pipe';
import { TruncatePipe } from '../pipes/truncate-pipe';
import { TextMaskModule } from 'angular2-text-mask';


// PROVIDERS
import { AngularFireModule } from 'angularfire2';
import { UserStorageService } from '../providers/database/user-storage-service';
import { CalendarStorageService } from '../providers/database/calendar-storage-service';
import { ChatStorageService } from '../providers/database/chat-storage-service';
import { MySpaceStorageService } from '../providers/database/my-space-storage-service';
import { DateUtil } from '../providers/util/date-util';
import { Utils } from '../providers/util/utils';

// PAGES
import { MyApp } from './app.component';
import { ApresentationPage } from '../pages/apresentation/apresentation';
import { CalendarPage } from '../pages/calendar/calendar';
import { CalendarNewEventPage } from '../pages/calendar/new-event/new-event'
import { CalendarEventEditPage } from '../pages/calendar/new-event/edit-event/edit-event';
import { CalendarEventQuestionsPage } from '../pages/calendar/new-event/edit-event/questions/questions';
import { CalendarPublicEventPage } from '../pages/calendar/public-event/public-event';
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
import { StatusEmotionPage } from '../pages/status-emotion/status-emotion';
import { TabsPage } from '../pages/tabs/tabs';
import { OvercomerPage } from '../pages/trinity/overcomer/overcomer';
import { AngelPage } from '../pages/trinity/angel/angel';
import { ArchangelPage } from '../pages/trinity/archangel/archangel';
import { ArchangelMissionsPage } from '../pages/trinity/archangel/missions/missions';
import { ArchangelMissionsDetailsPage } from '../pages/trinity/archangel/missions/details/details';
import { ArchangelMissionsHistoricalPage } from '../pages/trinity/archangel/missions/historical/historical';
import { ArchangelChatPage } from '../pages/trinity/archangel/chat/chat';
import { NormalPage } from '../pages/trinity/normal/normal';
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
    StatusEmotionPage,
    TabsPage,
    OvercomerPage,
    AngelPage,
    ArchangelPage,
    ArchangelMissionsPage,
    ArchangelMissionsDetailsPage,
    ArchangelMissionsHistoricalPage,
    ArchangelChatPage,
    NormalPage,
    CalendarPicker,
    DateCustomPipe,
    TruncatePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    TextMaskModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ApresentationPage,
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
    StatusEmotionPage,
    TabsPage,
    OvercomerPage,
    AngelPage,
    ArchangelPage,
    ArchangelMissionsPage,
    ArchangelMissionsDetailsPage,
    ArchangelMissionsHistoricalPage,
    ArchangelChatPage,
    NormalPage
  ],
  providers: [
    UserStorageService,
    CalendarStorageService,
    ChatStorageService,
    MySpaceStorageService,
    DateUtil,
    Utils
  ]
})
export class AppModule {}

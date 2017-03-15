import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

// COMPONENTS / PIPES / DIRECTIVES
import { CalendarPicker } from '../components/calendar-picker/calendar-picker';
import { DateCustomPipe } from '../pipes/date-custom-pipe';
import { TruncatePipe } from '../pipes/truncate-pipe';

// PROVIDERS
import { TextMaskModule } from 'angular2-text-mask';
import { AngularFireModule } from 'angularfire2';
import { AuthService } from '../providers/database/auth-service';
import { Storage } from '@ionic/storage';
import { UserStorageService } from '../providers/database/user-storage-service';
import { CalendarStorageService } from '../providers/database/calendar-storage-service';
import { ChatStorageService } from '../providers/database/chat-storage-service';
import { MySpaceStorageService } from '../providers/database/my-space-storage-service';
import { DateUtil } from '../providers/util/date-util';
import { Utils } from '../providers/util/utils';

// PAGES
import { MyApp } from './app.component';
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
import { ProfileEditPage } from '../pages/profile/edit/edit';
import { StatusEmotionPage } from '../pages/status-emotion/status-emotion';
import { TabsPage } from '../pages/tabs/tabs';
import { RegisterBasicDatas } from '../pages/register/basic-datas/basic-datas';
import { RegisterOtherCancer } from '../pages/register/other-cancer/other-cancer';
import { RegisterOtherDatas } from '../pages/register/other-datas/other-datas';
import { RegisterPicture } from '../pages/register/picture/picture';
import { RegisterState } from '../pages/register/state/state';
import { RegisterTypeCancer } from '../pages/register/type-cancer/type-cancer';
import { RegisterTypeTreatment } from '../pages/register/type-treatment/type-treatment';
import { RegisterTypeUser } from '../pages/register/type-user/type-user';
import { RegisterPastCancer } from '../pages/register/past-cancer/past-cancer';
import { OvercomerPage } from '../pages/trinity/overcomer/overcomer';
import { AngelPage } from '../pages/trinity/angel/angel';
import { VisitorPage } from '../pages/trinity/visitor/visitor';
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
    RegisterBasicDatas,
    RegisterOtherCancer,
    RegisterOtherDatas,
    RegisterPicture,
    RegisterState,
    RegisterTypeCancer,
    RegisterTypeTreatment,
    RegisterTypeUser,
    RegisterPastCancer,
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
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    TextMaskModule
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
    RegisterBasicDatas,
    RegisterOtherCancer,
    RegisterOtherDatas,
    RegisterPicture,
    RegisterState,
    RegisterTypeCancer,
    RegisterTypeTreatment,
    RegisterTypeUser,
    RegisterPastCancer,
    ProfilePage,
    ProfileEditPage,
    StatusEmotionPage,
    TabsPage,
    OvercomerPage,
    AngelPage,
    VisitorPage
  ],
  providers: [
    AuthService,
    UserStorageService,
    CalendarStorageService,
    ChatStorageService,
    DateUtil,
    MySpaceStorageService,
    Storage,
    Utils
  ]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

// PAGES
import { AuthPage } from './auth';
import { AuthLoginPage } from './login/login';
import { AuthRegisterPage } from './register/register';
// import { RegisterBasicDatas } from './register/basic-datas/basic-datas';
// import { RegisterOtherCancer } from './register/other-cancer/other-cancer';
// import { RegisterOtherDatas } from './register/other-datas/other-datas';
// import { RegisterPicture } from './register/picture/picture';
// import { RegisterState } from './register/state/state';
// import { RegisterTypeCancer } from './register/type-cancer/type-cancer';
// import { RegisterTypeTreatment } from './register/type-treatment/type-treatment';
// import { RegisterTypeUser } from './register/type-user/type-user';
// import { RegisterPastCancer } from './register/past-cancer/past-cancer';

@NgModule({
  declarations: [
    AuthPage,
    AuthLoginPage,
    AuthRegisterPage
  ],
  entryComponents: [
    AuthPage,
    AuthLoginPage,
    AuthRegisterPage
  ],
  imports: [
    IonicPageModule.forChild(AuthPage)
  ],
  exports: [
    AuthPage
  ]
})

export class AuthPageModule {

}

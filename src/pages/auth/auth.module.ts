import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

// PAGES
import { AuthPage } from './auth';
import { AuthLoginPage } from './login/login';
import { AuthRegisterPage } from './register/register';
import { AuthRegisterBasicDatasPage } from './register/basic-datas/basic-datas';
import { AuthRegisterOtherCancerPage } from './register/other-cancer/other-cancer';
import { AuthRegisterPicturePage } from './register/picture/picture';
import { AuthRegisterStatePage } from './register/state/state';
import { AuthRegisterTypeCancerPage } from './register/type-cancer/type-cancer';
import { AuthRegisterTypeTreatmentPage } from './register/type-treatment/type-treatment';
import { AuthRegisterTypeUserPage } from './register/type-user/type-user';
import { AuthRegisterPastCancerPage } from './register/past-cancer/past-cancer';
import { AuthRegisterConclusionPage } from './register/conclusion/conclusion';

@NgModule({
  declarations: [
    AuthPage,
    AuthLoginPage,
    AuthRegisterPage,
    AuthRegisterBasicDatasPage,
    AuthRegisterPicturePage,
    AuthRegisterStatePage,
    AuthRegisterTypeUserPage,
    AuthRegisterTypeCancerPage,
    AuthRegisterOtherCancerPage,
    AuthRegisterTypeTreatmentPage,
    AuthRegisterPastCancerPage,
    AuthRegisterConclusionPage

  ],
  entryComponents: [
    AuthPage,
    AuthLoginPage,
    AuthRegisterPage,
    AuthRegisterBasicDatasPage,
    AuthRegisterPicturePage,
    AuthRegisterStatePage,
    AuthRegisterTypeUserPage,
    AuthRegisterTypeCancerPage,
    AuthRegisterOtherCancerPage,
    AuthRegisterTypeTreatmentPage,
    AuthRegisterPastCancerPage,
    AuthRegisterConclusionPage
  ],
  imports: [
    IonicPageModule.forChild(AuthPage),
  ],
  exports: [
    AuthPage,
    AuthRegisterBasicDatasPage
  ]
})

export class AuthPageModule {

}

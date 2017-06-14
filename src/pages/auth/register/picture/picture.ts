import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AuthRegisterTypeUserPage } from '../type-user/type-user';
import { AuthService } from '../../../../providers/database/auth.service';
import { Utils } from '../../../../providers/util/utils';

@Component({
  selector: 'page-auth-register-picture',
  templateUrl: 'register-picture.html',
})
export class AuthRegisterPicturePage {
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public utils: Utils
  ) {
  }
  nextPage() {
    this.navCtrl.push(AuthRegisterTypeUserPage)
  }

  openGallery() {
    this.utils.openGallery().then((image) => {
      //this.authService.user.participant_profile_attributes.avatar = image;
    }).catch((error) => {
      console.log(error);
    })
  }

}

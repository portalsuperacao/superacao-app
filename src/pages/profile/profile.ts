import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ProfileEditPage } from './edit/edit';
import { UserStorageService } from '../../providers/database/user-storage-service';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {
  user : any;
  thumbClass: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public userStorageService: UserStorageService) {}

  ionViewDidLoad() {
    this.user = this.userStorageService.getUserObs();
    this._verifyClassOfThumb();
  }

  openEdit() {
    this.user.subscribe((user) => {
      let modal = this.modalCtrl.create(ProfileEditPage, {user: user});
      modal.present();
    });
  }

  _verifyClassOfThumb() {
    this.user.subscribe((datas : any) => {
      if(datas.type_user == 'Superador') {
        this.thumbClass = 'background-color-overcomer';
      } else if (datas.type_user == 'Anjo') {
        this.thumbClass = 'background-color-angel';
      }
    })
  }

}

import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { ProfileEditPage } from './edit/edit';
import { UserStorageService } from '../../providers/database/user-storage-service';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {
  user;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public userStorageService: UserStorageService) {}

  ionViewDidLoad() {
    this.user = this.userStorageService.getUserObs();
  }

  openEdit() {
    this.user.subscribe((user) => {
      let modal = this.modalCtrl.create(ProfileEditPage, {user: user});
      modal.present();
    });
  }

}

import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
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
    public viewController: ViewController,
    public userStorageService: UserStorageService) {}

  ionViewDidLoad() {
    this.userStorageService.getUserObs().subscribe((user) => {
      this.user = user;
      this._verifyClassOfThumb();
    });

  }

  openEdit() {
    let modal = this.modalCtrl.create(ProfileEditPage, {user: this.user});
    modal.onDidDismiss((datas) => {
      if(!datas) return;
      this.userStorageService.updateUser(datas, this.user.$key);
    })
    modal.present();
  }

  verifyRelationship(relationship) {
    if(relationship == 1) {
      return 'Solteiro(a)'
    } else if (relationship == 2) {
      return 'Casado(a)';
    } else if (relationship == 3) {
      return 'Divorciado(a)';
    }
  }

  _verifyClassOfThumb() {
    if(this.user.type_user == 'Superador') {
      this.thumbClass = 'background-color-overcomer';
    } else if (this.user.type_user == 'Anjo') {
      this.thumbClass = 'background-color-angel';
    }
  }


}

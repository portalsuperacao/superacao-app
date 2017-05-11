import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { ProfileEditPage } from './edit/edit';
import { UserStorageService } from '../../providers/database/user-storage-service';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {
  user;
  thumbClass;

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
    this.parseInt(relationship);
    if(relationship == 0) {
      return 'Solteiro(a)';
    } else if (relationship == 1) {
      return 'Casado(a)';
    } else if (relationship == 2) {
      return 'Divorciado(a)';
    }
  }

  verifyParticipant(participant) {
    this.parseInt(participant);
    if(participant == 0) {
      return 'Paciente';
    } else if (participant == 1) {
      return 'Mãe';
    } else if (participant == 2) {
      return 'Pai';
    } else if (participant == 3) {
      return 'Filho(a)';
    } else if (participant == 4) {
      return 'Irmão(a)'
    } else if (participant == 5) {
      return 'Parente';
    } else if (participant == 6) {
      return 'Outro';
    }
  }

  parseInt(value) {
    return +value;
  }

  private _verifyClassOfThumb() {
    if(this.user.type_user == 'Superador') {
      this.thumbClass = 'background-color-overcomer';
    } else if (this.user.type_user == 'Anjo') {
      this.thumbClass = 'background-color-angel';
    }
  }


}

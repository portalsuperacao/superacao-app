import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { MySpaceDoctorsEventPage } from './event/doctors-event';
import { UserStorageService } from '../../../providers/database/user-storage.service';
import { MySpaceStorageService } from '../../../providers/database/my-space-storage-service';


@Component({
  selector: 'page-my-space-doctors',
  templateUrl: 'doctors.html'
})
export class MySpaceDoctorsPage {
  user;
  doctors;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public userStorageService : UserStorageService,
    public mySpaceStorageService: MySpaceStorageService,
    public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    this.userStorageService.getUser().subscribe((user) => {
      this.user = user
      this.doctors = this.mySpaceStorageService.getDoctorsEvent(this.user.$key)
    })
  }


  newEvent() {
    let modal = this.modalCtrl.create(MySpaceDoctorsEventPage);
    modal.present();

    modal.onDidDismiss((data) => {
      if(!data) {
        return;
      }

      this.mySpaceStorageService.insertDoctorsEvent(this.user.$key, data).then(() => {
        this.doctors = this.mySpaceStorageService.getDoctorsEvent(this.user.$key)
      });
    });
  }

  removeEvent(doctor) {
    let alert = this.alertCtrl.create({
      title: "Deseja remover?",
      message: "Você deseja mesmo remover o contato " + doctor.name + " ?",
      buttons: [
        {
          text: 'Sim',
          handler: data => {
            this.mySpaceStorageService.removeDoctorsEvent(this.user.$key, doctor).then(() => {
              this.doctors = this.mySpaceStorageService.getDoctorsEvent(this.user.$key)
            });
          }
        },
        {
          text: 'Não'
        }
      ]
    });

    alert.present();
  }

  editEvent(doctor) {
    let modal = this.modalCtrl.create(MySpaceDoctorsEventPage, {"doctor" : doctor});
    modal.present();

    modal.onDidDismiss((data) => {
      if(!data) {
        return;
      }

      this.mySpaceStorageService.updateDoctorsEvent(this.user.$key, data).then(() => {
        this.doctors = this.mySpaceStorageService.getDoctorsEvent(this.user.$key)
      });
    });

  }



}

import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'page-my-space-doctors-event',
  templateUrl: 'doctors-event.html'
})
export class MySpaceDoctorsEventPage {
  params;
  formEvent;
  showClosePhone;
  phones = [];
  mask = ['(', /[1-9]/, /[1-9]/, ')', ' ', /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/, '-', /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public fb: FormBuilder) {
      this.params = this.navParams.get('doctor');
      this.phones.push({type: 'Consultorio', number: ''});

      if(this.params) {
        this.formEvent = this.fb.group({
          name: [this.params.name, Validators.required],
          lastName: [this.params.last_name],
          email: [this.params.email],
          speciality: [this.params.speciality],
          address: [this.params.address]
        });

      } else {
        this.formEvent = this.fb.group({
          name: ["", Validators.required],
          lastName: [""],
          email: [""],
          speciality: [""],
          address: [""],
        });
      }
    }


  ionViewDidLoad() {

  }

  clickPhone(index) {
    this.showClosePhone = index;
  }

  closePage() {
    this.viewCtrl.dismiss();
  }

  insertEvent(datas) {
    let wrapper : any = {
      name: datas.name,
      last_name: datas.lastName,
      email: datas.email,
      speciality: datas.speciality,
      address: datas.address,
      phones: this.phones
    }

    if(this.params) {
      wrapper.$key = this.params.$key;
    }
    
    this.viewCtrl.dismiss(wrapper);
  }

  addPhone() {
    this.phones.push({type: 'Consultorio', number: ''});
  }

  removePhone(index) {
    if(this.phones.length <= 1) {
      return;
    }

    this.phones.splice(index, 1);
  }

  validePhones() {
    for(let i = 0; i < this.phones.length; i++) {
      if(this.phones[i].number.length <= 8) {
        return false;
      }
    }

    return true;
  }



}

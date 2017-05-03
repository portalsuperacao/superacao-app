import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterPicture } from '../picture/picture';
import { RegisterTypeUser } from '../type-user/type-user';


@Component({
  selector: 'page-register-basic-datas',
  templateUrl: 'register-basic-datas.html',
})
export class RegisterBasicDatas {
  formGroup: FormGroup;
  showMessage: boolean;

  constructor(public navCtrl: NavController, public fb: FormBuilder) {
    this.formGroup = this.fb.group({
      name: ["", Validators.required],
      email:["", Validators.required],
      password: ["", Validators.required],
      passwordVerify: ["", Validators.required]
    });
    this.showMessage = false
  }

  sendDatas(datas) {
    if(datas.password !== datas.passwordVerify) {
      this.showMessage = true
      return
    }

    this.navCtrl.push(RegisterTypeUser, { user: datas })
  }
}

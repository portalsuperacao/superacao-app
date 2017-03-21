import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from 'ionic-native';
import { DateUtil } from '../../../providers/util/date-util';
import { Utils } from '../../../providers/util/utils';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html'
})

export class ProfileEditPage {
  user : any;
  formGroup: FormGroup;
  thumbClass: any;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public params: NavParams,
    public formBuilder: FormBuilder,
    public dateUtil: DateUtil,
    public utils: Utils) {
      this.user  = this.params.get('user');


      this.formGroup = this.formBuilder.group({
        name: [this.user.name, Validators.required],
        occupation: [this.user.occupation],
        birthdate: [this.user.birthdate ? this.dateUtil.formatDate(this.user.birthdate) : null],
        state: [this.user.state],
        city: [this.user.city],
        country: [this.user.country],
        genre: [this.user.genre],
        relationship: [this.user.relationship],
        religion: [this.user.religion],
        children: [this.user.children],
        name_cancer: [this.user.name_cancer],
        type_cancer: [this.user.type_cancer],
        treatmentCirurgia : [this.user.treatment ? this.user.treatment.cirurgia : null],
        treatmentQuimioterapia : [this.user.treatment ? this.user.treatment.quimioterapia : null],
        treatmentRadiografia : [this.user.treatment ? this.user.treatment.radiografia : null],
        treatmentTerapiaOral : [this.user.treatment ? this.user.treatment.terapia_oral : null],
        treatmentTerapiaOval : [this.user.treatment ? this.user.treatment.terapia_oval : null],
        treatmentTerapiaNaturais : [this.user.treatment ? this.user.treatment.terapia_naturais : null],
        healing_phrase: [this.user.other_datas ? this.user.other_datas.healing_phrase : null],
        phrase_of_difficulties: [this.user.other_datas ? this.user.other_datas.phrase_of_difficulties : null]
      })
    }

  ionViewDidLoad() {
    this._verifyClassOfThumb();
  }

  openGallery() {
    this.utils.openGallery().then((image) => {
      this.user.avatar = image
    }).catch((error) => {
      console.log(error)
    })
  }

  updateLocation() {
    Geolocation.getCurrentPosition().then((datas) => {
      console.log(datas)
    }).catch((error) => {
      console.log(error)
    })
  }

  closePage(formDatas) {
    Promise.resolve()
    .then(filterDatas.bind(this))
    .then(updateDatas.bind(this))
    .then(sendDatas.bind(this))

    function filterDatas() {
      let datas : any;
      datas = formDatas;
      datas.treatment = {};

      datas.email = this.user.email;
      datas.avatar = this.user.avatar;
      datas.type_user = this.user.type_user;
      datas.provider = this.user.provider;
      datas.other_datas = this.user.other_datas;
      datas.emotion = this.user.emotion;
      datas.birthdate = this.dateUtil.formatDateString(formDatas.birthdate);

      datas.treatment.cirurgia = formDatas.treatmentCirurgia;
      datas.treatment.quimioterapia = formDatas.treatmentQuimioterapia;
      datas.treatment.radiografia = formDatas.treatmentRadiografia;
      datas.treatment.terapia_oral = formDatas.treatmentTerapiaOral;
      datas.treatment.terapia_oval = formDatas.treatmentTerapiaOval;
      datas.treatment.terapia_natural = formDatas.treatmentTerapiaNaturais;

      datas.other_datas.healing_phrase = formDatas.healing_phrase;
      datas.other_datas.phrase_of_difficulties = formDatas.phrase_of_difficulties;
      return datas;
    }

    function updateDatas(datas) {
      delete formDatas.treatmentCirurgia;
      delete formDatas.treatmentQuimioterapia;
      delete formDatas.treatmentRadiografia;
      delete formDatas.treatmentTerapiaOral;
      delete formDatas.treatmentTerapiaOval;
      delete formDatas.treatmentTerapiaNaturais;

      delete formDatas.healing_phrase;
      delete formDatas.phrase_of_difficulties;

      return datas;
    }

    function sendDatas(datas) {
      this.viewCtrl.dismiss(datas)
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

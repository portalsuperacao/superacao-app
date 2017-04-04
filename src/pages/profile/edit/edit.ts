import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateUtil } from '../../../providers/util/date-util';

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
    public dateUtil: DateUtil ) {
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
        cancer_name: [this.user.cancer_name],
        cancer_name_past: [this.user.cancer_name_past],
        type_participant: [this.user.type_participant],
        metastase: [this.user.type_cancer ? this.user.type_cancer.metastase : null],
        reicidiva: [this.user.type_cancer ? this.user.type_cancer.reicidiva : null],
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

  closePage(formDatas) {
    if(this.formGroup.invalid) {
      return
    }
    Promise.resolve()
    .then(filterDatas.bind(this))
    .then(updateDatas.bind(this))
    .then(sendDatas.bind(this))

    function filterDatas() {
      let datas : any;
      datas = formDatas;
      datas.treatment = {};
      datas.type_cancer = {};

      datas.email = this.user.email;
      datas.avatar = this.user.avatar;
      datas.type_user = this.user.type_user;
      datas.provider = this.user.provider;
      datas.other_datas = this.user.other_datas;
      datas.emotion = this.user.emotion;
      datas.birthdate = this.dateUtil.formatDateString(formDatas.birthdate);

      datas.type_cancer.metastase = formDatas.metastase;
      datas.type_cancer.reicidiva = formDatas.reicidiva;

      datas.treatment.cirurgia = formDatas.treatmentCirurgia;
      datas.treatment.quimioterapia = formDatas.treatmentQuimioterapia;
      datas.treatment.radiografia = formDatas.treatmentRadiografia;
      datas.treatment.terapia_oral = formDatas.treatmentTerapiaOral;
      datas.treatment.terapia_oval = formDatas.treatmentTerapiaOval;
      datas.treatment.terapia_naturais = formDatas.treatmentTerapiaNaturais;

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

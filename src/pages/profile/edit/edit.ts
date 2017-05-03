import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateUtil } from '../../../providers/util/date-util';
import { Geolocation } from '@ionic-native/geolocation';

declare const google : any;

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html'
})

export class ProfileEditPage {
  user : any;
  formGroup: FormGroup;
  thumbClass: any;

  constructor(
    private geolocation: Geolocation,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public params: NavParams,
    public loadingCtrl: LoadingController,
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
        past_cancer_type: [this.user.past_cancer_type],
        participant_type: [this.user.participant_type],
        is_metastasis: [this.user.type_cancer ? this.user.type_cancer.is_metastasis : null],
        is_recurrent: [this.user.type_cancer ? this.user.type_cancer.is_recurrent : null],
        treatmentCirurgia : [this.user.treatment ? this.user.treatment.cirurgia : null],
        treatmentQuimioterapia : [this.user.treatment ? this.user.treatment.quimioterapia : null],
        treatmentRadiografia : [this.user.treatment ? this.user.treatment.radiografia : null],
        treatmentTerapiaOral : [this.user.treatment ? this.user.treatment.terapia_oral : null],
        treatmentTerapiaOval : [this.user.treatment ? this.user.treatment.terapia_oval : null],
        treatmentTerapiasNaturais : [this.user.treatment ? this.user.treatment.terapias_naturais : null],
        healing_phrase: [this.user.other_datas ? this.user.other_datas.healing_phrase : null],
        phrase_of_difficulties: [this.user.other_datas ? this.user.other_datas.phrase_of_difficulties : null]
      })
    }

  ionViewDidLoad() {
    this._verifyClassOfThumb();
  }

  validateInput() {
    if(this.formGroup.invalid) {
      return 'validate-input'
    }
  }

  updateLocation() {
    let loading = this.loadingCtrl.create({
      content: 'Atualizando...'
    })
    loading.present()

    this.geolocation.getCurrentPosition().then((location) => {
      let geocoder = new google.maps.Geocoder();
      let latlng = {
        location: {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        }
      }

      geocoder.geocode(latlng, (results) =>  {
        loading.dismiss()
        this.formGroup.controls['state'].setValue(results[0].address_components[5].short_name);
        this.formGroup.controls['city'].setValue(results[0].address_components[4].long_name);
        this.formGroup.value.latitude = location.coords.latitude;
        this.formGroup.value.longitude = location.coords.longitude;
      })
    })
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

      datas.type_cancer.is_metastasis = formDatas.is_metastasis;
      datas.type_cancer.is_recurrent = formDatas.is_recurrent;

      datas.treatment.cirurgia = formDatas.treatmentCirurgia;
      datas.treatment.quimioterapia = formDatas.treatmentQuimioterapia;
      datas.treatment.radiografia = formDatas.treatmentRadiografia;
      datas.treatment.terapia_oral = formDatas.treatmentTerapiaOral;
      datas.treatment.terapia_oval = formDatas.treatmentTerapiaOval;
      datas.treatment.terapias_naturais = formDatas.treatmentTerapiasNaturais;

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
      delete formDatas.treatmentTerapiasNaturais;

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

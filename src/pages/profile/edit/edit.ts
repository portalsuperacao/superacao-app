import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utils } from '../../../providers/util/utils';
import { DateUtil } from '../../../providers/util/date-util';
import { UserModel } from '../../../model/user';
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
    public dateUtil: DateUtil,
    public utils: Utils ) {
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

  openGallery() {
    this.utils.openGallery().then((image) => {
      this.user.avatar = image
    }).catch((error) => {
      console.log(error)
    })
  }

  closePage(formDatas) {
    if(this.formGroup.invalid) {
      return
    }
    Promise.resolve()
    .then(filterDatas.bind(this))
    .then(removeDatasExtra.bind(this))
    .then(sendDatas.bind(this))

    function filterDatas() {
      let user = new UserModel();
      Object.assign(user, formDatas);

      if(formDatas.birthdate) {
        user.birthdate = this.dateUtil.parseDate(formDatas.birthdate, '00:00:00');
      }

      user.type_cancer.is_metastasis = formDatas.is_metastasis;
      user.type_cancer.is_recurrent = formDatas.is_recurrent;

      user.treatment.cirurgia = formDatas.treatmentCirurgia;
      user.treatment.quimioterapia = formDatas.treatmentQuimioterapia;
      user.treatment.radiografia = formDatas.treatmentRadiografia;
      user.treatment.terapia_oral = formDatas.treatmentTerapiaOral;
      user.treatment.terapia_oval = formDatas.treatmentTerapiaOval;
      user.treatment.terapias_naturais = formDatas.treatmentTerapiasNaturais;user
      user.other_datas.healing_phrase = formDatas.healing_phrase;
      user.other_datas.phrase_of_difficulties = formDatas.phrase_of_difficulties;

      return user;
    }

    function removeDatasExtra(datas) {
      delete datas.uid;
      delete datas.treatmentCirurgia;
      delete datas.treatmentQuimioterapia;
      delete datas.treatmentRadiografia;
      delete datas.treatmentTerapiaOral;
      delete datas.treatmentTerapiaOval;
      delete datas.treatmentTerapiasNaturais;
      delete datas.healing_phrase;
      delete datas.phrase_of_difficulties;
      delete datas.is_metastasis;
      delete datas.is_recurrent;
      return datas;
    }

    function sendDatas(datas) {
      this.viewCtrl.dismiss(datas);
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

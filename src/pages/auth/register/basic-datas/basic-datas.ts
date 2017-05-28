import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthRegisterPicturePage } from '../picture/picture';
import { AuthRegisterTypeUserPage } from '../type-user/type-user';

@Component({
  selector: 'page-auth-register-basic-datas',
  templateUrl: 'register-basic-datas.html'
})
export class AuthRegisterBasicDatasPage {
  facebookDatas;
  states;
  childrens;
  relationships;
  religions;
  genres;
  isRadioButtonClass;
  nextPage;

  constructor(public navCtrl: NavController, public fb: FormBuilder, public navParams : NavParams) {
    this.facebookDatas = this.navParams.get('facebookDatas');
    this.isRadioButtonClass = false;
    this.states =  [ "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP", "TO" ];
    this.childrens = ["Não tenho filhos", "1 filho", "2 filhos", "3 filhos", "4 filhos", "Mais de 4 filhos"];
    this.relationships = ["Solteiro", "Casado", "Divorciado", "Viuvo"];
    this.religions = ["Católico", "Evangelico", "Espirita", "Ateu", "Outra religião"];
    this.genres = ["Masculino", "Feminino"];

    if(this.facebookDatas) {
      this.nextPage = AuthRegisterTypeUserPage;
    } else {
      this.nextPage = AuthRegisterPicturePage;
    }
  }

  clickCheckTerms() {
    this.isRadioButtonClass = !this.isRadioButtonClass;
  }

}

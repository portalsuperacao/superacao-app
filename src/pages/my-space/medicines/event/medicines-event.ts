import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { DateUtil } from '../../../../providers/util/date-util';


@Component({
  selector: 'page-my-space-medicines-event',
  templateUrl: 'medicines-event.html'
})
export class MySpaceMedicinesEventPage {
  formEvent;
  isEndDate;
  intervalOptions = [];
  params

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public dateUtil : DateUtil) {
      let today = new Date();
      this.isEndDate = false;

      for(let i = 0; i < 24; i++) {
        this.intervalOptions.push(i + 1);
      }

      this.params = this.navParams.get('medicine');

      if(this.params) {
        this.formEvent = this.fb.group({
          name: [this.params.title, Validators.required],
          lastName: [this.dateUtil.formatDate(this.params.start_at), Validators.required],
          speciality: [this.dateUtil.formatTime(this.params.start_at), Validators.required],
          dosage: [this.params.dosage, Validators.required],
          conc: [this.params.conc, Validators.required],
          interval: [this.params.interval, Validators.required],
          obs: [this.params.obs]
        });
      } else {
        this.formEvent = this.fb.group({
          title: ["", Validators.required],
          startDate: [this.dateUtil.formatDate(today.getTime()), Validators.required],
          startTime: [this.dateUtil.formatTime(today.getTime()), Validators.required],
          dosage: ["", Validators.required],
          conc: ["", Validators.required],
          interval: [1, Validators.required],
          obs: [""]
        });
      }

  }

  closePage() {
    this.viewCtrl.dismiss();
  }

  insertEvent(datas) {
    let wrapper : any = {
      title: datas.title,
      start_at:  this.dateUtil.parseDate(datas.startDate, datas.startTime),
      conc: datas.conc,
      dosage: datas.dosage,
      interval: datas.interval,
      obs: datas.obs
    }

    if(this.params) {
      wrapper.$key = this.params.$key;
    }

    this.viewCtrl.dismiss(wrapper);
  }

}

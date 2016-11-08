import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateUtil } from '../../../../providers/util/date-util';


@Component({
  selector: 'page-my-space-medicines-event',
  templateUrl: 'medicines-event.html'
})
export class MySpaceMedicinesEventPage {
  formEvent;
  isEndDate;
  intervalOptions = [];

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public fb: FormBuilder,
    public dateUtil : DateUtil) {
      let today = new Date();
      this.isEndDate = false;

      for(let i = 0; i < 24; i++) {
        this.intervalOptions.push(i + 1);
      }

      this.formEvent = this.fb.group({
        title: ["", Validators.required],
        startDate: [this.dateUtil.formatDate(today.getTime()), Validators.required],
        startTime: [this.dateUtil.formatTime(today.getTime()), Validators.required],
        dosage: ["", Validators.required],
        interval: [1, Validators.required]
      });

  }

  closePage() {
    this.viewCtrl.dismiss();
  }

  insertEvent(datas) {
    let wrapper = {
      title: datas.title,
      start_at:  this.dateUtil.parseDate(datas.startDate, datas.startTime),
      dosage: datas.dosage,
      interval: datas.interval
    }

    this.viewCtrl.dismiss(wrapper);
  }

}

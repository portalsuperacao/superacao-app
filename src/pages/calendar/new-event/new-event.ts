import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CalendarEventEditPage } from './edit-event/edit-event';

@Component({
    selector: 'page-calendar-new-event',
    templateUrl: 'new-event.html'
})

export class CalendarNewEventPage {

  constructor(
    public navCtrl: NavController,
    public params: NavParams) {
  }

  addEvent(typeEvent) {
    this.navCtrl.push(CalendarEventEditPage, {type: typeEvent});
  }
}

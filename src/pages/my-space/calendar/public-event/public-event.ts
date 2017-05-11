import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CalendarStorageService } from '../../../../providers/database/calendar-storage-service';

@Component({
    selector: 'page-public-event',
    templateUrl: 'public-event.html',
})

export class CalendarPublicEventPage {
  user;
  events;
  isEmpty = true;

  constructor(
    private navCtrl: NavController,
    private params: NavParams,
    private calendarStorageService: CalendarStorageService) {
      this.user = this.params.get('user');
      this.events = this.calendarStorageService.getPublicEvents(this.user.$key);

      this.events.subscribe((event) => {
        if(event.length) {
          this.isEmpty = false;
        }
      });
  }

}

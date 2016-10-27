import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CalendarStorageService } from '../../../providers/database/calendar-storage-service';

@Component({
    selector: 'page-calendar-public-event',
    templateUrl: 'public-event.html',
})

export class CalendarPublicEventPage {
  user;
  events;
  isEmpty = true;

  constructor(
    public nav: NavController,
    public params: NavParams,
    public calendarStorageService: CalendarStorageService) {
      this.user = this.params.get('user');
      this.events = this.calendarStorageService.getPublicEvents(this.user.$key);

      this.events.subscribe((event) => {
        if(event.length) {
          this.isEmpty = false;
        }
      });
  }

}

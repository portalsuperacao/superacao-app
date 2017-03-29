import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalendarNewEventPage } from '../../pages/calendar/new-event/new-event';
import { DateUtil } from '../../providers/util/date-util';
import moment from 'moment';
import 'moment/locale/pt-br';

@Component({
    selector: 'calendar-picker',
    template: `
      <div class="calendar-picker">
        <div class="month-name">
          <div class="arrow">
            <button ion-button icon-only clear (click)="previousMonth()">
              <ion-icon name="ios-arrow-back"> </ion-icon>
            </button>
          </div>
          <div> <p> {{ month.format("MMM, YYYY") }} </p> </div>
          <div class="arrow">
            <button ion-button icon-only clear (click)="nextMonth()">
              <ion-icon name="ios-arrow-forward"> </ion-icon>
            </button>
          </div>
          <div class="add">
            <button ion-button icon-only round (click)="addEvent()">
              <ion-icon name="add"> </ion-icon>
            </button>
          </div>
        </div>
        <ion-row class="week-name">
          <ion-col width-14> DOM </ion-col>
          <ion-col width-14> SEG </ion-col>
          <ion-col width-14> TER </ion-col>
          <ion-col width-14> QUA </ion-col>
          <ion-col width-14> QUI </ion-col>
          <ion-col width-14> SEX </ion-col>
          <ion-col width-14> SAB </ion-col>
        </ion-row>
        <ion-row class="week" *ngFor="let week of weeks">
          <ion-col width-14 class="day"
          [ngClass]="{today: day.isToday, 'different-month': !day.isCurrentMonth, selected: day.date.isSame(selected)}"
          (click)="select(day)"
          *ngFor="let day of week.days">
            <span> {{ day.number }} </span>
            <div *ngIf="day.event">
              <div *ngFor="let mark of day.event" class="event-mark" [ngClass]="mark"> </div>
            </div>
          </ion-col>
        </ion-row>
      </div>
    `
})

export class CalendarPicker {
  @Output() dateSelected = new EventEmitter();
  @Input() setEvents;
  schedule;
  selected;
  weeks;
  month;
  start;


  constructor(public nav: NavController, public dateUtil : DateUtil) {

  }

  ngOnInit() {
    this._initCalendar();
    this.dateSelected.emit(this.selected);
  }

  ngOnChanges($changes) {
    this._initCalendar();
  }

  nextMonth() {
    let next = this.month.clone();
    this._resetWeek(next.month(next.month()+1).date(1));
    this.month.month(this.month.month()+1);

    this._buildMonth(next, this.month);
  }

  previousMonth() {
    let previous = this.month.clone();
    this._resetWeek(previous.month(previous.month()-1).date(1));
    this.month.month(this.month.month()-1);

    this._buildMonth(previous, this.month);
  }

  select(day) {
    this.selected = day.date;
    this.dateSelected.emit(this.selected);
  }

  addEvent() {
    this.nav.push(CalendarNewEventPage);
  }

  _initCalendar() {
    this.selected = moment();
    this.month = this.selected.clone();

    let start = this.selected.clone();
    start.date(1);

    this._resetWeek(start.date(0));
    this._buildMonth(start, this.month);
  }

  _buildMonth(start, month) {
    this.weeks = [];
    let done = false;
    let date = start.clone();
    let monthIndex = date.month();
    let count = 0;

    while(!done) {
      this.weeks.push({days: this._buildWeek(date.clone(), month)})
      date.add(1, "w");
      done = count++ && monthIndex !== date.month();
      monthIndex = date.month();
    }
  }

  _buildWeek(date , month) {
    let days = [];
    let index = 0;

    for(let i = 0; i < 7; i++) {
      let controller = true;
      let count = 0;

      this.setEvents.forEach((event) => {
        if(date.valueOf() >= this.dateUtil.removeTime(event.start_at) &&
           date.valueOf() <= event.end_at && count == 0) {

          days.push({
            name: date.format("dd").substring(0, 1),
            number: date.date(),
            isCurrentMonth: date.month() === month.month(),
            isToday: date.isSame(new Date(), "day"),
            date: date,
            event: [event.type]
          });

          controller = false;
          count++;
        } else if (date.valueOf() >= this.dateUtil.removeTime(event.start_at) &&
                   date.valueOf() <= event.end_at && count > 0) {
          days[index].event.push(event.type);
        }
      });

      if(controller) {
        days.push({
          name: date.format("dd").substring(0, 1),
          number: date.date(),
          isCurrentMonth: date.month() === month.month(),
          isToday: date.isSame(new Date(), "day"),
          date: date,
          event: false

        });
      }

      date = date.clone();
      date.add(1, "d");
      index++;
    }

    return days;
  }

  _verifyEventMark(date) {
    return new Promise((resolve) => {
      this.setEvents.forEach((event) => {
        if(date.valueOf() >= this.dateUtil.removeTime(event.start_at) &&
           date.valueOf() <= this.dateUtil.removeTime(event.end_at)) {
            resolve(event.type);
        }
      });
      resolve(false);
    });
  }
  _resetWeek(date) {
    return date.day(0).hour(0).minute(0).second(0).millisecond(0);
  }

}

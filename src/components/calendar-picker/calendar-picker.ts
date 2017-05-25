import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalendarNewEventPage } from '../../pages/my-space/calendar/new-event/new-event';
import { DateUtil } from '../../providers/util/date-util';
import moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'calendar-picker',
  templateUrl: 'calendar-picker.html'
})

export class CalendarPicker implements OnInit, OnChanges {
  @Output() dateSelected = new EventEmitter();
  @Input() setEvents;
  schedule;
  selected;
  weeks;
  month;
  start;

  constructor(
    public nav: NavController,
    public dateUtil : DateUtil) {

  }

  ngOnInit() {
    this._initCalendar();
    this.dateSelected.emit(this.selected);
  }

  ngOnChanges() {
    this._initCalendar();
    this.dateSelected.emit(this.selected);
  }

  nextMonth() {
    let next = this.month.clone();
    this._resetWeek(next.month(next.month()+1).date(1));
    this.month.month(this.month.month()+1);

    this._buildMonth(next, this.month);
    this.dateSelected.emit(this.month);
  }

  previousMonth() {
    let previous = this.month.clone();
    this._resetWeek(previous.month(previous.month()-1).date(1));
    this.month.month(this.month.month()-1);

    this._buildMonth(previous, this.month);
    this.dateSelected.emit(this.month);
  }

  select(day) {
    this.selected = day.date;
    this.dateSelected.emit(this.selected);
  }

  addEvent() {
    this.nav.push(CalendarNewEventPage);
  }

  private _initCalendar() {
    this.selected = moment();
    this.month = this.selected.clone();

    let start = this.selected.clone();
    start.date(1);

    this._resetWeek(start.date(0));
    this._buildMonth(start, this.month);
  }

  private _buildMonth(start, month) {
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

  private _buildWeek(date , month) {
    let days = [];
    let index = 0;

    for(let i = 0; i < 7; i++) {
      let controller = true;
      let count = 0;
      this.setEvents.forEach((event) => {
        if(date.valueOf() >= this.dateUtil.removeTime(event.start_at) && date.valueOf() <= event.end_at && count == 0) {
          days.push({
            name: date.format("dd").substring(0, 1),
            number: date.date(),
            isCurrentMonth: date.month() === month.month(),
            isToday: date.isSame(new Date(), "day"),
            date: date,
            marks: [event.type]
          });

          controller = false;
          count++;
        } else if (date.valueOf() >= this.dateUtil.removeTime(event.start_at) && date.valueOf() <= event.end_at && count > 0) {
          days[index].marks.push(event.type);
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

  private _resetWeek(date) {
    return date.day(0).hour(0).minute(0).second(0).millisecond(0);
  }



}

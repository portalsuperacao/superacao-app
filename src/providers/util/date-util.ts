import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Injectable()

export class DateUtil {

  parseDate(date, time) {
    let partsDate = date.split("-");
    let partsTime = time.split(":");
    let result = new Date(partsDate[0], (partsDate[1] - 1), partsDate[2], partsTime[0], partsTime[1]);
    return result.getTime();
  }

  formatDate(milis: number) {
    let date = new Date(milis);
    let start = "00";

    let year = date.getFullYear();
    let month = (start + (date.getMonth() +1)).slice(-start.length);
    let day = (start + date.getDate()).slice(-start.length);

    return year + "-" + month  + "-" + day;
  }

  formatTime(milis: number) {
    let date = new Date(milis);
    let start = "00";

    let hour = (start + date.getHours()).slice(-start.length);
    let sec =  (start + date.getMinutes()).slice(-start.length);

    return hour + ":" + sec;
  }


  formatDateString(date: string) {
    let parseDate = new Date(date);
    return parseDate.getTime();
  }

  formatDateBR(date: Date) {
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  }

  removeTime(date) {
    let newDate = moment(date);
    return newDate.hour(0).minute(0).second(0).millisecond(0);
  }

}

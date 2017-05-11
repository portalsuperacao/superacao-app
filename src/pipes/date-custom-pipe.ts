import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
import 'moment/locale/pt-br';


@Pipe({
  name: 'customDate'
})

/*
----- 'm' -> Return name of month
----- 'd' -> Return name of day
----- 'c' -> Return days from now
----- 'a' -> Return age
----- 't' -> Return time
*/

export class DateCustomPipe implements PipeTransform {
  transform(value: number, exponent: string) : string {

    let date = new Date(value);

    if(exponent === 'm') {
      return moment(date).format('MMMM');
    } else if (exponent === 'd') {
      return moment(date).format('dddd');
    } else if (exponent === 'c') {
      return moment(date).fromNow();
    } else if (exponent === 'a') {
      return `${moment().diff(date, 'years')} anos`;
    } else if (exponent === 't') {
      let h = date.getHours();
      let m = date.getMinutes();

      if(date.getMinutes() < 10) {
        return h + " : 0" + m;
      }
      return h + " : " + m;
    }
  }

}

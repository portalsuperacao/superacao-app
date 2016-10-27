import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';


@Pipe({
  name: 'customDate'
})

/*
----- 'm' -> Return name of month
----- 'd' -> Return name of day
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
    } else {
      return 'Exponent invalid';
    }
  }

}

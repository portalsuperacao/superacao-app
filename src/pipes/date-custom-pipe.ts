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
    } else if (exponent === 't') {
      let h = date.getHours();
      let m = date.getMinutes();

      if(date.getMinutes() < 10) {
        return h + " : 0" + m;
      }
      return h + " : " + m;

    } else if (exponent === 'b'){
      let d = date.getDate();
      let m = date.getMonth() + 1;
      let y = date.getFullYear();

      if ((d < 10) && (m < 10)) {
        return "0" + d + "/0" + m + "/" +  y;
      }
      if(d < 10) {
        return "0" + d + "/" + m + "/" +  y;
      }
      if (m < 10) {
        return "0" + d + "/0" + m + "/" +  y;
      }
      return  d + "/" + m + "/" +  y;

    } else {
      return 'Exponent invalid';
    }
  }

}

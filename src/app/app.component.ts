import { Component } from '@angular/core';

import * as moment from 'moment-timezone';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

  offsetNumber: any;
  symbol: string;
  momentOffset: number;
  dateOffset: number;
  result: number;

  defaultTime: moment.moment;

  timezone = '';
   // Function that handles the offset issue that occurs when one swtiches from a moment to a date
  offsetCalculation(date: any, calendarSelection = false) {
    let display = null;
    // nullify previous values
    this.offsetNumber = null;
    this.symbol = null;
    this.momentOffset = null;
    this.dateOffset = null;
    this.result = null;

 
    // create date object
    this.defaultTime = moment(date).tz(this.timezone).startOf('day');
    console.log(this.defaultTime);

    // math to get offset between laptop timezone and selected site timezone
    // get the UTC offset of the website's timezone
    this.offsetNumber = moment(date).tz(this.timezone).startOf('day').format('Z');
    // get the +/- symbol
    this.symbol = this.offsetNumber.charAt(0);
    // take the hours and convert it to a number
    this.momentOffset = this.offsetNumber.match(/[0-9]{1,2}/);
    this.momentOffset = +this.momentOffset;
    // get the UTC offset of the computer's timezone
    this.dateOffset = new Date(this.defaultTime).getTimezoneOffset() / 60;
    console.log('Offset from local timezone to UTC and from UTC to selected timezone');
    console.log(this.dateOffset);
    console.log(this.momentOffset);

    let biggerNumber = Math.max(this.momentOffset, this.dateOffset);
    let smallerNumber = Math.min(this.momentOffset, this.dateOffset);

    console.log('Bigger number and smaller number to prevent math formula issue');
    console.log(biggerNumber);
    console.log(smallerNumber);

    console.log('conditional symbol and determination of which function');
    console.log(this.symbol);
    console.log(calendarSelection);
    // calculate the total offset based on the symbol, else should never occur but is there in case something goes wrong
    if (this.symbol === '+') {
      this.result = biggerNumber + smallerNumber;
      if (calendarSelection) {
        display = moment(date).tz(this.timezone).subtract('' + this.result, 'hours');
      }
      else {
        display = moment(date).tz(this.timezone).add('' + this.result, 'hours');
      }
    }
    else if (this.symbol === '-') {
      this.result = biggerNumber - smallerNumber;
      if (calendarSelection) {
        display = moment(date).tz(this.timezone).add('' + this.result, 'hours');
      }
      else {
        display = moment(date).tz(this.timezone).subtract('' + this.result, 'hours');
      }
    }
    else {
      this.result = 0;
      date = null;
      display = null;
      console.log('edge case had');
    }
    console.log('total offset number');
    console.log(this.result);
    console.log('what will be returned if picked from calendar');
    console.log(display);
    console.log(display.tz(this.timezone).format('YYYY/MM/DD H:mm'));
    console.log(calendarSelection);
    if (calendarSelection) {
      return display;
    }
    else {
      return display.toDate();
    }
  }
}


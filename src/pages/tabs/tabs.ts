import { Component } from '@angular/core';

import { OvercomerPage } from '../trinity/overcomer/overcomer';
import { AngelPage } from '../trinity/angel/angel';
import { ArchangelPage } from '../trinity/archangel/archangel';
import { CalendarPage } from '../calendar/calendar';
import { MySpacePage } from '../my-space/my-space';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = MySpacePage;
  tab2Root: any = OvercomerPage;
  tab3Root: any = CalendarPage;

  constructor() {

  }
}

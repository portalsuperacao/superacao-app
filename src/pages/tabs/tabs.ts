import { Component } from '@angular/core';
import { UserStorageService } from '../../providers/database/user-storage-service';

import { OvercomerPage } from '../trinity/overcomer/overcomer';
import { AngelPage } from '../trinity/angel/angel';
import { VisitorPage } from '../trinity/visitor/visitor';
import { MySpacePage } from '../my-space/my-space';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  mySpacePage = MySpacePage;
  trinityPage;

  constructor(public userStorageService: UserStorageService) {
    this._verifyTypeOfUserPage();
  }

  private _verifyTypeOfUserPage() {
    this.userStorageService.getUser().then((user : any) => {
      if(user.type_user === "Superador") {
        this.trinityPage = OvercomerPage;
      } else if (user.type_user === "Anjo") {
        this.trinityPage = AngelPage;
      } else {
        this.trinityPage = VisitorPage;
      }
    });
  }

}

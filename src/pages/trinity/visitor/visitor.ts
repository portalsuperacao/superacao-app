import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TrinityService } from '../../../providers/database/trinity-service'

@Component({
  selector: 'page-visitor',
  templateUrl: 'visitor.html'
})
export class VisitorPage {
  public code

  constructor(
    public navCtrl: NavController,
    public trinityService: TrinityService
  ) {}

  ionViewDidLoad() {

  }

  sendActiveUserCode() {
    this.trinityService.activeUserCode(this.code).subscribe((data) => {
      console.log(data)
    })

    function validateUserCode() {

    }

    function updateTypeUser() {

    }

    function registerTrinity() {

    }

  }
}

// {
//   "data": {
//     "id": "79",
//     "type": "overcomers",
//     "attributes": {
//       "cancer-status": "during_treatment",
//       "uid": "OUT4lTNNalPrxA7MaTMW4jcW0Ff1"
//     },
//     "relationships": {
//       "participant-profile": {
//         "data": {
//           "id": "148",
//           "type": "participant-profiles"
//         }
//       },
//       "current-treatment-profile": {
//         "data": {
//           "id": "99",
//           "type": "treatment-profiles"
//         }
//       },
//       "past-treatment-profile": {
//         "data": null
//       },
//       "trinity": {
//         "data": {
//           "id": "50",
//           "type": "trinities"
//         }
//       }
//     }
//   }
// }

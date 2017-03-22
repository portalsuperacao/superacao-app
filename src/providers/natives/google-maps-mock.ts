import { GoogleMaps } from '@ionic-native/google-maps';

export class GoogleMapsMock extends GoogleMaps {
  geocode(request) {
    return new Promise((resolve) => {
      
    })
  }
}

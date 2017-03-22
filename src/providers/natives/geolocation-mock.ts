import { Geolocation } from '@ionic-native/geolocation';

export class GeolocationMock extends Geolocation {
  getCurrentPosition() {
    return new Promise((resolve) => {
      let position = {
        coords: {
          latitude: -23.574070,
          longitude: -46.628332,
          accuracy: 1,
          altitude: 1,
          altitudeAccuracy: 1,
          heading: 1,
          speed: 1
        }
      }

      resolve(position)
    })
  }
}

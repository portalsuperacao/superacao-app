import { LocalNotifications } from '@ionic-native/local-notifications';

export class LocalNotificationMock extends LocalNotifications {
  getAll() {
    return new Promise((resolve) => {
      resolve()
    })
  }
  clearAll() {
    return new Promise((resolve) => {
      resolve()
    })
  }
}

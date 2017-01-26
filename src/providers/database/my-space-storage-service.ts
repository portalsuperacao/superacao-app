import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import 'rxjs/Observable';

@Injectable()


export class MySpaceStorageService {
  constructor(private af: AngularFire, private storage: Storage) {

  }

  private makeUid() {
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let uid = ''
    for(let i = 0; i < 10; i++) {
      uid += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return uid
  }

  private updateArrayDatasOfLocalStorage(key, value) {
    return new Promise((resolve) => {
      this.storage.get(key).then((datas) => {
        if(datas) {
          datas.push(value)
          resolve(datas)
        } else {
          resolve([value])
        }
      })
    })
  }

  private insertDatasInLocalStorage(key, value) {
    return new Promise((resolve) => {
      value.uid = this.makeUid()
      this.updateArrayDatasOfLocalStorage(key, value).then((datas : any) => {
        this.storage.set(key, datas).then(() => {
          resolve()
        })
      })
    })
  }

  private deleteDatasInLocalStorage(key, uid) {
    return new Promise((resolve) => {
      this.storage.get(key).then((datas) => {
        for(let i = 0; i < datas.length; i++ ){
          if(datas[i].uid === uid) {
            datas.splice(i, 1)
          }
        }
        return datas
      }).then((datas) => {
        this.storage.set(key, datas).then(() => {
          resolve()
        })
      })
    })
  }

  private updateDatasInLocalStorage(key, uid, value) {
    return new Promise((resolve) => {
      this.deleteDatasInLocalStorage(key, uid).then(() => {
         this.insertDatasInLocalStorage(key, value).then(() => {
           resolve()
         })
      })
    })
  }

  // Medicines
  insertMedicineEvent(uidUser, datas) {
    return this.insertDatasInLocalStorage('medicines', datas)
  }

  updateMedicineEvent(uidUser, datas) {
    return this.updateDatasInLocalStorage('medicines', datas.uid, datas)
  }

  removeMedicineEvent(uidUser, datas) {
    return this.deleteDatasInLocalStorage('medicines', datas.uid)
  }

  getMedicinesEvents(uidUser) {
    return this.storage.get('medicines')
  }


  // Doctors
  insertDoctorsEvent(uidUser, datas) {
    return this.insertDatasInLocalStorage('doctors', datas)
  }

  updateDoctorsEvent(uidUser, datas) {
    return this.updateDatasInLocalStorage('doctors', datas.uid, datas)
  }

  removeDoctorsEvent(uidUser, datas) {
    return this.deleteDatasInLocalStorage('doctors', datas.uid)
  }

  getDoctorsEvent(uidUser) {
    return this.storage.get('doctors')
  }

  // Notes
  insertNotesEvent(uidUser, datas) {
    return this.insertDatasInLocalStorage('notes', datas)
  }

  updateNotesEvent(uidUser, datas) {
    return this.updateDatasInLocalStorage('notes', datas.uid, datas)
  }

  removeNotesEvent(uidUser, datas) {
    return this.deleteDatasInLocalStorage('notes', datas.uid)
  }

  getNotesEvent(uidUser) : any {
    return this.storage.get('notes')
  }


}

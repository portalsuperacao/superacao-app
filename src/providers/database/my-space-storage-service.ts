import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import * as localforage from "localforage";
import 'rxjs/Observable';

@Injectable()


export class MySpaceStorageService {
  constructor(private af: AngularFire) {

  }

  // Medicines
  insertMedicineEvent(uidUser, datas) {
    let database = this.af.database.list('/medicines/' + uidUser);
    database.push(datas);
  }

  updateMedicineEvent(uidUser, datas) {
    let database = this.af.database.list('/medicines/' + uidUser);
    let key = datas.$key;
    delete datas.$key;

    database.update(key, datas);
  }

  removeMedicineEvent(uidUser, datas) {
    let database = this.af.database.list('/medicines/' + uidUser);
    database.remove(datas.$key);
  }

  getMedicinesEvents(uidUser) : any {
    return this.af.database.list('/medicines/' + uidUser);
  }

  // Doctors
  insertDoctors(uidUser, datas) {
    let database = this.af.database.list('/doctors/' + uidUser);
    database.push(datas);
  }

  updateDoctors(uidUser, datas) {
    let database = this.af.database.list('/doctors/' + uidUser);
    let key = datas.$key;
    delete datas.$key;

    database.update(key, datas);
  }

  removeDoctors(uidUser, datas) {
    let database = this.af.database.list('/doctors/' + uidUser);
    database.remove(datas.$key);
  }

  getDoctors(uidUser) : any {
    return this.af.database.list('/doctors/' + uidUser);
  }

  // Notes
  insertNotes(uidUser, datas) {
    let database = this.af.database.list('/notes/' + uidUser);
    database.push(datas);
  }

  updateNotes(uidUser, datas) {
    let database = this.af.database.list('/notes/' + uidUser);
    let key = datas.$key;
    delete datas.$key;

    database.update(key, datas);
  }

  removeNotes(uidUser, datas) {
    let database = this.af.database.list('/notes/' + uidUser);
    database.remove(datas.$key);
  }

  getNotes(uidUser) : any {
    return this.af.database.list('/notes/' + uidUser);
  }


}

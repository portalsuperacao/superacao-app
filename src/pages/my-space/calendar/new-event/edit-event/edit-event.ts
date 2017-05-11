import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarPage } from '../../../calendar/calendar';
import { CalendarStorageService } from '../../../../../providers/database/calendar-storage-service';
import { UserStorageService } from '../../../../../providers/database/user-storage-service';
import { CalendarEventQuestionsPage } from './questions/questions';
import { DateUtil } from '../../../../../providers/util/date-util';

@Component({
  selector: 'page-calendar-event-edit.html',
  templateUrl: 'edit-event.html',
})

export class CalendarEventEditPage {
  formEvent : FormGroup;
  typeEvent;
  eventDatas;
  titleEvent;
  needBrings = [];
  questions = [];
  countItems = [];
  countItemsQuestions = [];
  showCloseItem = false;
  showCloseQuestionItem = false;

  constructor(
    public fb: FormBuilder,
    public navCtrl: NavController,
    public params: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public userStorageService: UserStorageService,
    public calendarStorageService: CalendarStorageService,
    public dateUtil: DateUtil) {

    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setHours(today.getHours() + 1);

    if(this.params.get('datas')) {
      this.eventDatas = this.params.get('datas');
      this.typeEvent = this.eventDatas.type;

      this.formEvent = this.fb.group({
        title: [this.eventDatas.title, Validators.required],
        address: [this.eventDatas.address, Validators.required],
        startDate: [this.dateUtil.formatDate(this.eventDatas.start_at), Validators.required],
        startTime: [this.dateUtil.formatTime(this.eventDatas.start_at), Validators.required],
        endDate: [this.dateUtil.formatDate(this.eventDatas.end_at), Validators.required],
        endTime: [this.dateUtil.formatTime(this.eventDatas.end_at), Validators.required],
        typeOfMedic: [this.eventDatas.other_datas.type_of_medic || ""],
        share: [this.eventDatas.share || true],
        comments: [this.eventDatas.comments || ""]
      });

      this.needBrings = this.eventDatas.other_datas.need_bring || [];
      this.questions = this.eventDatas.other_datas.questions || [];

      if(this.needBrings) {
        this.needBrings.forEach((datas) => {
            this.countItems.push("");
        });
      }

      if(this.questions) {
        this.questions.forEach((datas) => {
          this.countItemsQuestions.push("");
        })
      }
      return;
    }

    this.typeEvent = this.params.get('type');

    this.formEvent = this.fb.group({
      title: ["", Validators.required],
      address: ["", Validators.required],
      startDate: [this.dateUtil.formatDate(today.getTime()), Validators.required],
      startTime: [this.dateUtil.formatTime(today.getTime()), Validators.required],
      endDate: [this.dateUtil.formatDate(tomorrow.getTime()), Validators.required],
      endTime: [this.dateUtil.formatTime(tomorrow.getTime()), Validators.required],
      typeOfMedic: [""],
      share: [true],
      comments: [""]
    });
  }

  insertEvent(datas) {
    let newDatas  = {
      title: datas.title,
      type: this.typeEvent,
      address: datas.address,
      start_at: this.dateUtil.parseDate(datas.startDate, datas.startTime),
      end_at: this.dateUtil.parseDate(datas.endDate, datas.endTime),
      share: datas.share,
      comments: datas.comments,
      other_datas: {
        type_of_medic: datas.typeOfMedic,
        need_bring: this.needBrings,
        questions: this.questions
      }
    }

    if(newDatas.start_at >= newDatas.end_at || newDatas.end_at <= newDatas.start_at) {
      let alert = this.alertCtrl.create({
        title: "Ops! Datas inválidas",
        subTitle: "Não foi possivel criar o evento, pois as datas são incompativeis",
        buttons: ['Ok']
      });

      alert.present();
      return;
    }

    if(this.eventDatas) {
      this.userStorageService.getUser().then((user: any) => {
        this.calendarStorageService.updateEvent(newDatas, this.eventDatas, user.$key);
      });

      this.navCtrl.pop();
      return;
    }

    this.userStorageService.getUser().then((user: any) => {
      this.calendarStorageService.insertEvent(newDatas, user.$key)
    });

    this.navCtrl.pop().then(() => {
        this.navCtrl.pop();
    });
  }


  addNeedBring() {
    this.countItems.push("");
  }

  addQuestions() {
    this.countItemsQuestions.push("");
  }

  clickItem(index) {
    this.showCloseItem = index;
  }

  clickItemQuestion(index) {
    this.showCloseQuestionItem = index;
  }

  closeItem(index) {
    this.countItems.splice(index, 1);
    this.needBrings.splice(index, 1);
  }

  closeItemQuestion(index) {
    this.countItemsQuestions.splice(index, 1);
    this.questions.splice(index, 1);
  }

  openQuestions() {
    let modal = this.modalCtrl.create(CalendarEventQuestionsPage);
    modal.present();

    modal.onDidDismiss((datas) => {
      if(!datas) {
        return;
      }

      this.questions.push(datas.question);
      this.countItemsQuestions.push("");
    })
  }

}

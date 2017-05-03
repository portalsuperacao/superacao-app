import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';

@Injectable()
export class TrinityService {
  private headers : Headers;
  private options : RequestOptions;
  private url = "http://192.168.99.100:3000";

  constructor(
    private http : Http,
    private af: AngularFire) {
      this._generateAuthToken();
  }

  getTrinity() {
    return this.http.get(this.url + '/participants/1');
  }

  activeUserCode(code) {
    let body = new URLSearchParams()
    body.append('code', code)
    return this.http.post(this.url + '/participant/activate', body.toString(), this.options).map(res => res.json());
  }

  _generateAuthToken() {
    this.af.auth.getAuth().auth.getToken().then((token) => {
      this.headers = new Headers();
      this.headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
      this.headers.append('Authorization', `Bearer ${token}`);
      this.options = new RequestOptions({headers: this.headers});
      console.log(token);
    })
  }

}

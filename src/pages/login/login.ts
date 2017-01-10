import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { AuthService } from '../../providers/database/auth-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})


export class LoginPage {

  messagesError;
  ctrlLogo = false;
  loading;
  formType = 'login';

 // --- FORM DATAS -----
  formSignup: FormGroup;
  formLogin : FormGroup;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public fb : FormBuilder,
    public authService: AuthService
  ) {
      this.formSignup = this.fb.group({
        name: ["", Validators.required],
        email: ["", Validators.required],
        password: ["", [Validators.required, Validators.minLength(6)]],
        passConfirm: ["", [Validators.required, Validators.minLength(6)]]
      });

      this.formLogin = this.fb.group({
        email: ["", Validators.required],
        password:  ["", [Validators.required, Validators.minLength(6)]]
      });

      this.messagesError = {
        login: 'Não foi possivel realizar o login, tente novamente mais tarde, ou entre em contato',
        sigup: 'Não foi possivel realizar o cadastro, tente novamente mais tarde, ou entre em contato'
      }

  }

  signup(credentials) {
    this._showLoading();

    if(this._validateForm(credentials) === false) {
      return;
    }

    console.log(credentials);
    // this.authService.signUpWithEmail(credentials).then(() => {
    //   this.loading.dismiss();
    // }).catch(() => {
    //   this._showError(this.messagesError.login)
    // });
  }

  login(credentials) {
    this._showLoading();
    this.authService.signInWithEmail(credentials).then(() => {
      this.loading.dismiss();
    }).catch(() => {
      this._showError(this.messagesError.login)
    });
  }

  loginFacebook() {
    this._showLoading();
    this.authService.signWithFacebook().then(() => {
      this.loading.dismiss();
    }).catch((err) => {
      this._showError(err);
    });
  }

  _showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Aguarde...",
    });

    this.loading.present();
  }

  _showError(text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: "Houve algum problema!",
      subTitle: text,
      buttons: ['Ok']
    });

    alert.present();
  }

  _validateForm(credentials) : any {
    if(!credentials.email || !credentials.pass || !credentials.passConfirm) {
      this._showError('Preencha todos os campos');
      return false;
    }
    if(!(credentials.pass === credentials.passConfirm)) {
       this._showError('As senhas digitadas não são iguais');
       return false;
    }

    return true;
  }

}

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

  formSignup: FormGroup;
  formLogin : FormGroup;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public fb : FormBuilder,
    public authService: AuthService) {
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
  }

  signup(credentials) {
    this._showLoading();
    if(this._validateForm(credentials) === false) {
      return;
    }

    this.authService.signUpWithEmail(credentials).then(() => {
      this.loading.dismiss();
    }).catch((error : any) => {
      console.log(error);
      this._showError(this._validateMessagesError(error.code));
    });
  }

  login(credentials) {
    this._showLoading();
    this.authService.signInWithEmail(credentials).then(() => {
      this.loading.dismiss();
    }).catch((error : any) => {
      console.log(error);
      this._showError(this._validateMessagesError(error.code));
    });
  }

  loginFacebook() {
    this._showLoading();
    this.authService.signWithFacebook().then(() => {
      this.loading.dismiss();
    }).catch((error : any) => {
      console.log(error);
      this._showError(this._validateMessagesError(error.code));
    });
  }

  private _showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Aguarde...",
    });

    this.loading.present();
  }

  private _showError(text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: "Houve algum problema!",
      subTitle: text,
      buttons: ['Ok']
    });

    alert.present();
  }

  private _validateForm(credentials) : any {
    if(!credentials.name || !credentials.email || !credentials.password || !credentials.passConfirm) {
      this._showError('Preencha todos os campos');
      return false;
    }
    if(!(credentials.password === credentials.passConfirm)) {
       this._showError('As senhas digitadas não são iguais');
       return false;
    }

    return true;
  }

  private _validateMessagesError(message) {
    let errorMessages = {
      userNotFind : 'Não foi possivel realizar o cadastro, este usuário não existe',
      userEquals : 'Não foi possivel realizar o cadastro, este usuário já existe',
      offline: 'Não foi possivel realizar a conexão com os nossos servidores',
      undefined: 'Ocorreu algum problema desconhecido, entre em contato conosco para resolver este problema'
    }

    switch(message) {
      case "auth/email-already-in-use":
        return errorMessages.userEquals
      case "auth/user-not-found":
        return errorMessages.userNotFind
      case "auth/network-request-failed":
        return errorMessages.offline
      default:
        return errorMessages.undefined;
    }
  }

}

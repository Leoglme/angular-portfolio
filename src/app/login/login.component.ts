import {Component, OnInit} from '@angular/core';
import {HttpService} from '../Services/http.service';
import {FormControl, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import getPrototypeOf = Reflect.getPrototypeOf;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  age: any;
  loading = false;
  buttonText = "Submit";
  button: any;
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
    Validators.maxLength(120),
    Validators.pattern(/^[a-zA-Z0-9!?_ñ.\- é@àôîÏè#$%^&*()]+$/)
  ]);

  nameFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(80),
    Validators.pattern(/^[a-zA-Z0-9!?_ñ.\- é@àôîÏè#$%^&*()]+$/)
  ]);

  textFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(250),
    Validators.pattern(/^[a-zA-Z0-9!?_ñ.\- é@àôîÏè#$%^&*()]+$/)
  ]);

  constructor(public http: HttpService) {}

  ngOnInit() {
    this.errorGestion('form-email');
    this.errorGestion('form-text');
    this.errorGestion('form-name');
    this.button = document.querySelector('.button');
  }
  register(e: { preventDefault: () => void; }) {
    console.log(this.emailFormControl);
    e.preventDefault();
    this.button.classList.toggle('send');
    this.loading = true;
    this.buttonText = "Envoie...";
    const user = {
      name: this.nameFormControl.value,
      text: this.textFormControl.value,
      email: this.emailFormControl.value
    };
    this.http.sendEmail(environment.sendMailAPI, user).subscribe(
        (data: any) => {
          console.log(
            `👏 > 👏 > 👏 > 👏 ${user.name} message envoyé, id => ${data.messageId}`
        );
      },
        (err: any) => {
        console.log(err);
        this.loading = false;
        this.button.classList.remove('finished');
        this.button.classList.remove('send');
        this.buttonText = "Envoyé";
      }, () => {
        this.loading = false;
        this.button.classList.remove('send');
        this.button.classList.add('finished');
        setTimeout(() =>  this.button.classList.remove('finished'), 2000);
        this.buttonText = "Envoyé";
      }
    );
  }
  errorGestion(id: string){
    const cible = document.getElementById(id);
    if (cible !== null){
      cible.addEventListener('keyup', (e) => {
        // @ts-ignore
        const error = cible.parentNode.children[3];
        // @ts-ignore
        const value = (document.getElementById(id)).value;
        if (error !== undefined){
          value.length !== 0 ? error.classList.add('fade-in') : error.classList.remove('fade-in');
        }
      });
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {HttpService} from '../Services/http.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  age: any;
  loading = false;
  buttonText = "Submit";

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  nameFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(3)
  ]);

  textFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(255),
  ]);

  constructor(public http: HttpService) {}

  ngOnInit() {
  }
  register(e: { preventDefault: () => void; }) {
    e.preventDefault();
    this.loading = true;
    this.buttonText = "Envoie...";
    const user = {
      name: this.nameFormControl.value,
      text: this.textFormControl.value,
      email: this.emailFormControl.value
    };
    this.http.sendEmail("https://dibodev.herokuapp.com/sendmail", user).subscribe(
        (data: any) => {
          console.log(
            `👏 > 👏 > 👏 > 👏 ${user.name} message envoyé, id => ${data.messageId}`
        );
      },
        (err: any) => {
        console.log(err);
        this.loading = false;
        this.buttonText = "Envoyé";
      }, () => {
        this.loading = false;
        this.buttonText = "Envoyé";
      }
    );
  }
}

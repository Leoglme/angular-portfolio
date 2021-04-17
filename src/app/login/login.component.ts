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
    Validators.minLength(4)
  ]);

  constructor(public http: HttpService) {}

  ngOnInit() {
    console.log("this.http.test", this.http.test);
  }
  register(e: { preventDefault: () => void; }) {
    e.preventDefault();
    this.loading = true;
    this.buttonText = "Submiting...";
    const user = {
      name: this.nameFormControl.value,
      email: this.emailFormControl.value
    };
    this.http.sendEmail("http://localhost:3000/sendmail", user).subscribe(
        (data: any) => {
          console.log(
          `👏 > 👏 > 👏 > 👏 ${user.name} is successfully register and mail has been sent and the message id is ${data.messageId}`
        );
      },
        (err: any) => {
        console.log(err);
        this.loading = false;
        this.buttonText = "Submit";
      }, () => {
        this.loading = false;
        this.buttonText = "Submit";
      }
    );
  }
}

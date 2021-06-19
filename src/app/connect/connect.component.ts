import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../Services/http.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
  validatingForm: FormGroup | undefined;
  button: any;
  loading = false;
  buttonText = "Se connecter";

  passwordFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(40),
    Validators.pattern(/^[a-zA-Z0-9!?_ñ.\- é@àôîÏè#$%^&*()]+$/)
  ]);

  constructor(public http: HttpService) {
  }

  ngOnInit() {
    this.validatingForm = new FormGroup({
      modalFormAvatarPassword: new FormControl('', Validators.required)
    });
    this.errorGestion('form-password');
    this.button = document.querySelector('.button');
  }

  connect(e: { preventDefault: () => void; }) {
    e.preventDefault();
    this.button.classList.toggle('send');
    this.loading = true;
    this.buttonText = "Connexion...";
    const body = {
      password: this.passwordFormControl.value,
    };
    this.http.connect(environment.postConnect, body).subscribe(
      (data: any) => {
        console.log(
          `👏 > 👏 > 👏 > 👏 ${data.messageId}`
        );
      },
      (err: any) => {
        console.log(err);
        this.loading = false;
        this.button.classList.remove('finished');
        this.button.classList.remove('send');
        this.buttonText = "Erreur";
      }, () => {
        this.loading = false;
        this.button.classList.remove('send');
        this.button.classList.add('finished');
        setTimeout(() =>  this.button.classList.remove('finished'), 2000);
        this.buttonText = "Connexion réussie";
      }
    );
  }
  get modalFormAvatarPassword() {
    if (this.validatingForm) {
      return this.validatingForm.get('modalFormAvatarPassword');
    } else {
      return null;
    }
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

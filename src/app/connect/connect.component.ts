import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../Services/http.service';
import {environment} from '../../environments/environment';
import {SnackbarComponent} from '../administration/categories/snackbar/snackbar.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit, AfterViewInit {
  validatingForm: FormGroup | undefined;
  button: any;
  loading = false;
  buttonText = 'Se connecter';
  durationInSeconds = 3;
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(40),
    Validators.pattern(/^[a-zA-Z0-9!?_ñ.\- é@àôîÏè#$%^&*()]+$/)
  ]);

  constructor(public http: HttpService, public snackBar: MatSnackBar, private router: Router) {
  }

  ngAfterViewInit(): void {
    this.errorGestion('form-password');
  }

  ngOnInit() {
    localStorage.removeItem('isLoggedIn');
    this.validatingForm = new FormGroup({
      modalFormAvatarPassword: new FormControl('', Validators.required)
    });
    this.button = document.querySelector('.button');
  }

  connect(e: { preventDefault: () => void; }) {
    e.preventDefault();
    this.button.classList.toggle('send');
    this.loading = true;
    this.buttonText = 'Connexion...';
    const body = {
      username: environment.adminUsername,
      password: this.passwordFormControl.value,
    };
    this.http.connect(environment.postConnect, body).subscribe(
      (data: any) => {
        if (data.success){
          this.openSnackBar(data.message, 'success-snackbar');
          console.log(
            `👏 > 👏 > 👏 > 👏 ${data.message}`
          );
          localStorage.setItem('isLoggedIn', 'true');
          console.log(localStorage.getItem('isLoggedIn'));
          this.router.navigate(['/administration']);
        }else{
          this.openSnackBar(data.message, 'error-snackbar');
        }
      },
      (err: any) => {
        console.log('err', err);
        if (err.error && err.error.message){
          this.openSnackBar(err.error.message, 'error-snackbar');
        }
        this.loading = false;
        this.button.classList.remove('finished');
        this.button.classList.remove('send');
        this.buttonText = 'Erreur';
      }, () => {
        this.loading = false;
        this.button.classList.remove('send');
        this.button.classList.add('finished');
        setTimeout(() => this.button.classList.remove('finished'), 2000);
        this.buttonText = 'Connexion réussie ';
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

  openSnackBar(message: string, className: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      panelClass: className,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: this.durationInSeconds * 1000
    });
  }

  errorGestion(id: string) {
    const cible = document.getElementById(id);
    if (cible !== null) {
      cible.addEventListener('keyup', (e) => {
        // @ts-ignore
        const error = cible.parentNode.children[3];
        // @ts-ignore
        const value = (document.getElementById(id)).value;
        if (error !== undefined) {
          value.length !== 0 ? error.classList.add('fade-in') : error.classList.remove('fade-in');
        }
      });
    }
  }

}

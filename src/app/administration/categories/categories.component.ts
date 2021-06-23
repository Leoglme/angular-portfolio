import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import {SnackbarComponent} from './snackbar/snackbar.component';

interface CustomBoolean {
  value: string;
  viewValue: string;
}

let globalChangeCategoryName = '';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit, AfterViewInit {
  rating: number | undefined;
  selectedValue: string | undefined;
  changeCategoryName = '';
  durationInSeconds = 3;
  messageSuccess = 'La catégorie ' + this.changeCategoryName + ' à bien été créée 😃';
  messageError = 'Désolé une erreur est survenue 😔';
  maxRating = 5;
  fileImageName = '';
  fileImage: File | null = null;
  isLinear = false;
  isError = false;
  booleans: CustomBoolean[] = [
    {value: 'false', viewValue: 'Oui'},
    {value: 'true', viewValue: 'Non'},
  ];
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(60),
    Validators.pattern(/^[a-zA-Z0-9!|/?_ñ.\- é@àôîÏè#$%^&*()]+$/)
  ]);
  imageControl = new FormControl('', [
    Validators.required
  ]);
  btnDisableControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private http: HttpClient, public snackBar: MatSnackBar) {
    this.rating = 0;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.errorGestion('name');
    this.errorGestion('btnDisable');
    this.errorGestion('image');
  }

  submitData(e: any) {
    let route = this.nameFormControl.value.trim().replace(' | ', '/');
    route = route.replace(' ', '-');
    const fd = new FormData();
    // @ts-ignore
    fd.append('croppedImage', this.fileImage);
    fd.append('language', this.nameFormControl.value);
    fd.append('btnDisable', this.btnDisableControl.value);
    // @ts-ignore
    fd.append('rating', this.rating);
    fd.append('route', route);
    this.http.post('http://localhost:9000/categories/add', fd)
      .subscribe((res: any) => {
        if (res.success){
          this.openSnackBar(this.messageSuccess, 'success-snackbar');
        }else{
          this.isError = true;
          this.openSnackBar(this.messageError, 'error-snackbar');
        }
      });
  }

  handleFileInputChange(l: FileList, e: any): void {
    this.fileImage = e.target.files[0];
    this.fileImageName = l[0].name;
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

  resetStepper() {
    const allInput: any = document.querySelectorAll('.md-form input');
    const allArea: any = document.querySelectorAll('.md-form textarea');
    allInput.forEach((input: { value: string; }) => {
      if (input) {
        input.value = '';
      }
    });
    allArea.forEach((input: { value: string; }) => {
      if (input.value) {
        input.value = '';
      }
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
        if (id === 'name') {
          this.changeCategoryName = value;
          globalChangeCategoryName = value;
        }
        if (error !== undefined) {
          value.length !== 0 ? error.classList.add('fade-in') : error.classList.remove('fade-in');
        }
      });
    }
  }
}

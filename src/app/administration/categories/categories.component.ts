import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
interface CustomBoolean {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit, AfterViewInit {
  rating: number | undefined;
  selectedValue: string | undefined;
  changeCategoryName = '';
  maxRating = 5;
  fileImageName = '';
  fileImage: File | undefined;
  isLinear = false;
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
  constructor() {
    this.rating = 0;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.errorGestion('name');
  }

  submitData(e: any) {
    e.preventDefault();
    let route = this.nameFormControl.value.trim().replace(' | ', '/');
    route = route.replace(' ', '-');
    const body = {
      language: this.nameFormControl.value,
      image: this.fileImage,
      btnDisable: this.btnDisableControl.value,
      rating: this.rating,
      route,
    };
    console.log(body);
  }

  handleFileInputChange(l: FileList, cible: string): void {
    this.fileImage = l[0];
    this.fileImageName = l[0].name;
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
        }
        if (error !== undefined) {
          value.length !== 0 ? error.classList.add('fade-in') : error.classList.remove('fade-in');
        }
      });
    }
  }
}

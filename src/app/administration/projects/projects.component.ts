import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackbarComponent} from '../categories/snackbar/snackbar.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  public color = '#d3334d';
  isLinear = false;
  isSuccess = false;
  durationInSeconds = 3;
  currencyYear = new Date().getFullYear().toString();
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: IDropdownSettings = {};
  fileLogo: File | undefined;
  fileLogoName = '';
  fileMockup1: File | undefined;
  fileMockup1Name = '';
  fileMockup2: File | undefined;
  fileMockup2Name = '';
  changeProjectName = '';
  languages: any = [];
  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(60),
    Validators.pattern(/^[a-zA-Z0-9!?_ñ.\- é@àôîÏè#$%^&*()]+$/)
  ]);
  productionTimeControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(120),
    Validators.pattern(/^[a-zA-Z0-9!?_ñ.\- é@àôîÏè#$%^&*()]+$/)
  ]);
  descriptionControl = new FormControl('', [
    Validators.required,
    Validators.minLength(25),
    Validators.maxLength(600)
  ]);
  urlFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(120)
  ]);
  githubControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(120)
  ]);
  colorControl = new FormControl('', [
    Validators.required
  ]);
  logoControl = new FormControl('', [
    Validators.required
  ]);
  mockup1Control = new FormControl('', [
    Validators.required
  ]);
  mockup2Control = new FormControl('', [
    Validators.required
  ]);
  chosenYearDate = new Date().getFullYear().toString();
  visible = true;
  isLoggedIn: any;
  isError = false;
  languagesApi = environment.languagesApi;

  // tslint:disable-next-line:variable-name
  constructor(private http: HttpClient, public snackBar: MatSnackBar, private _formBuilder: FormBuilder, private router: Router) {
  }

  ngAfterViewInit(): void {
    this.errorGestion('name');
    this.errorGestion('production__time');
    this.errorGestion('year');
    this.errorGestion('color');
    this.errorGestion('url');
    this.errorGestion('github');
    this.errorGestion('description');
    this.errorGestion('logo');
    this.errorGestion('mockup1');
    this.errorGestion('mockup2');
  }

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('isLoggedIn');
    if (!this.isLoggedIn) {
      this.router.navigate(['/auth/login']);
    }
    this.fetchLanguages();
    // tslint:disable-next-line:no-unused-expression
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  handleFileInputChange(l: FileList, cible: string): void {
    if (cible === 'logo') {
      this.fileLogo = l[0];
      this.fileLogoName = l[0].name;
    } else if (cible === 'mockup1') {
      this.fileMockup1 = l[0];
      this.fileMockup1Name = l[0].name;
    } else if (cible === 'mockup2') {
      this.fileMockup2 = l[0];
      this.fileMockup2Name = l[0].name;
    }
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

  onItemSelect(item: any) {
    if (!this.languages.includes(item.item_text)) {
      this.languages.push(item.item_text);
    }
  }

  onDeSelect(item: any) {
    const index = this.languages.indexOf(item.item_text);
    if (index > -1) {
      this.languages.splice(index, 1);
    }
  }

  onSelectAll(items: any) {
    items.forEach(((item: { item_text: any; }) => {
      if (!this.languages.includes(item.item_text)) {
        this.languages.push(item.item_text);
      }
    }));
  }

  submitData(e: any) {
    e.preventDefault();
    const year: any = document.querySelector('#year');
    let route = this.nameFormControl.value.trim().replace(' | ', '/');
    route = route.replace(' ', '-');
    let websiteUrl = this.urlFormControl.value.trim().replace('https://', '');
    websiteUrl = websiteUrl.replace('http://', '');
    const body = {
      name: this.nameFormControl.value,
      imageUrl: this.fileLogo,
      websiteUrl: this.urlFormControl.value,
      languages: this.languages,
      route: this.nameFormControl.value.trim().replace(' ', '-'),
      url: this.urlFormControl.value,
      github: this.githubControl.value,
      color: this.color,
      year: year ? year.value : new Date().getFullYear().toString(),
      production_time: this.productionTimeControl.value,
      description: this.descriptionControl.value,
      mockup1: this.fileMockup1,
      mockup2: this.fileMockup2,
      logo: this.fileLogo,
    };
    const fd = new FormData();
    /*Image Data*/
    // @ts-ignore
    fd.append('imageLogo', this.fileLogo);
    // @ts-ignore
    fd.append('mockup1', this.fileMockup1);
    // @ts-ignore
    fd.append('mockup2', this.fileMockup2);

    /*Body Data*/
    fd.append('name', this.nameFormControl.value);
    fd.append('websiteUrl', websiteUrl);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.languages.length; i++) {
      fd.append('languages[]', this.languages[i]);
    }
    fd.append('route', route);
    fd.append('url', this.urlFormControl.value);
    fd.append('github', this.githubControl.value);
    if (this.color) {
      fd.append('color', this.color);
    }
    fd.append('year', year ? year.value : new Date().getFullYear().toString());
    fd.append('production_time', this.productionTimeControl.value);
    fd.append('description', this.descriptionControl.value);
    this.http.post(environment.addProjectAPi, fd)
      .subscribe((res: any) => {
        console.log(res);
        if (res.success) {
          this.openSnackBar(res.message, 'success-snackbar');
        } else {
          this.openSnackBar(res.message, 'error-snackbar');
        }
      });
  }

  fetchLanguages(): void {
    const temp: { item_id: number; item_text: any; }[] = [];
    let i = 0;
    this.http.get(this.languagesApi)
      .subscribe((res) => {
        for (const [key, value] of Object.entries(res)) {
          temp.push({item_id: i, item_text: value.name});
          i++;
        }
        this.dropdownList = temp;
        const github = temp.find(lang => lang.item_text === 'github');
        const trello = temp.find(lang => lang.item_text === 'trello');
        this.selectedItems = [github, trello];
        this.selectedItems.forEach((item: { item_text: any; }) => {
          this.languages.push(item.item_text);
        });
        environment.languagesObject = res;
      });
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
        if (id === 'name') {
          this.changeProjectName = value;
        }
        if (error !== undefined) {
          value.length !== 0 ? error.classList.add('fade-in') : error.classList.remove('fade-in');
        }
      });
    }
  }

}

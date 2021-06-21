import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IDropdownSettings} from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  public color = '#d3334d';
  isLinear = false;
  isSuccess = false;
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
    Validators.maxLength(300),
    Validators.pattern(/^[a-zA-Z0-9!?_ñ.\- é@àôîÏè#$%^&*()]+$/)
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

  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder) {
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
    this.dropdownList = [
      {item_id: 1, item_text: 'Mumbai'},
      {item_id: 2, item_text: 'Bangaluru'},
      {item_id: 3, item_text: 'Pune'},
      {item_id: 4, item_text: 'Navsari'},
      {item_id: 5, item_text: 'New Delhi'}
    ];
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

    this.selectedItems = [{ item_id: 4, item_text: 'Pune' }, { item_id: 6, item_text: 'Navsari' }];
    this.selectedItems.forEach((item: { item_text: any; }) => {
      this.languages.push(item.item_text);
    });
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
    if (!this.languages.includes(item.item_text)){
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
      if (!this.languages.includes(item.item_text)){
        this.languages.push(item.item_text);
      }
    }));
  }
  submitData(e: any) {
    e.preventDefault();
    const year: any = document.querySelector('#year');
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
    console.log(body);
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

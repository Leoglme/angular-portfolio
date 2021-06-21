import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MultiDatepickerComponent} from './multidatepicker.component';
import {YearPickerComponent} from './year-picker-component/year-picker-component.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { IconsModule } from 'angular-bootstrap-md';
import { InputUtilitiesModule } from 'angular-bootstrap-md';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatMomentDateModule,
    IconsModule,
    InputUtilitiesModule
  ],
  declarations: [
    MultiDatepickerComponent,
    YearPickerComponent
  ],
  exports: [
    MultiDatepickerComponent,
  ],
})
export class MultiDatepickerModule {
}

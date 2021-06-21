import {
  AfterViewInit,
  Component,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR, Validators,
} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';

import {MultiDatepickerComponent} from '../multidatepicker.component';
import * as _moment from 'moment';
// @ts-ignore
import {default as _rollupMoment, Moment} from 'moment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

const moment = _rollupMoment || _moment;

export const YEAR_MODE_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker-component.component.html',
  styleUrls: ['./year-picker-component.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {provide: MAT_DATE_FORMATS, useValue: YEAR_MODE_FORMATS},
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YearPickerComponent),
      multi: true,
    },
  ],
})
export class YearPickerComponent implements ControlValueAccessor, AfterViewInit {
  @Input() jpCustomFormFieldClass = '';
  currencyYear = new Date().getFullYear().toString();
  /** Component label */
  @Input() label = '';

  // tslint:disable-next-line:variable-name
  _max: Moment | undefined;
  @Input()
  get max(): number | Date | undefined {
    return this._max ? this._max.year() : undefined;
  }

  set max(max: number | Date | undefined) {
    if (max) {
      const momentDate =
        typeof max === 'number' ? moment([max, 0, 1]) : moment(max);
      this._max = momentDate.isValid() ? momentDate : undefined;
    }
  }
  // tslint:disable-next-line:variable-name
  _min: Moment | undefined;
  @Input()
  get min(): number | Date | undefined{
    return this._min ? this._min.year() : undefined;
  }

  set min(min: number | Date | undefined) {
    if (min) {
      const momentDate =
        typeof min === 'number' ? moment([min, 0, 1]) : moment(min);
      this._min = momentDate.isValid() ? momentDate : undefined;
    }
  }

  @Input() touchUi = false;

  // tslint:disable-next-line:variable-name
  @ViewChild(MatDatepicker) _picker: MatDatepicker<Moment> | undefined;

  // tslint:disable-next-line:variable-name
  _inputCtrl = new FormControl('', [
    Validators.required
  ]);
  // Function to call when the date changes.
  onChange = (year: Date) => {
  }
  // Function to call when the input is touched (when a star is clicked).
  onTouched = () => {
  }

  /** send the focus away from the input so it doesn't open again */
    // tslint:disable-next-line:variable-name
  _takeFocusAway = (datepicker: MatDatepicker<any>) => {
  }

  constructor(private parent: MultiDatepickerComponent) {
  }

  ngAfterViewInit() {
    this._takeFocusAway = this.parent._takeFocusAway;
  }

  writeValue(date: Date): void {
    if (date && this._isYearEnabled(date.getFullYear())) {
      const momentDate = moment(date);
      if (momentDate.isValid()) {
        momentDate.set({date: 1});
        this._inputCtrl.setValue(moment(date), {emitEvent: false});
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    if (this._picker){
      isDisabled
        ? (this._picker.disabled = true)
        : (this._picker.disabled = false);
    }
    isDisabled ? this._inputCtrl.disable() : this._inputCtrl.enable();
  }

  _yearSelectedHandler(chosenDate: any, datepicker: MatDatepicker<any>) {
    datepicker.close();

    if (!this._isYearEnabled(chosenDate.year())) {
      return;
    }

    chosenDate.set({date: 1});

    this._inputCtrl.setValue(chosenDate, {emitEvent: false});
    this.onChange(chosenDate.toDate());
    this.onTouched();
  }

  _openDatepickerOnClick(datepicker: MatDatepicker<any>) {
    if (!datepicker.opened) {
      datepicker.open();
    }
  }

  /** Whether the given year is enabled. */
  private _isYearEnabled(year: number) {
    // disable if the year is greater than maxDate lower than minDate
    return !(year === undefined ||
      year === null ||
      (this._max && year > this._max.year()) ||
      (this._min && year < this._min.year()));
  }
}

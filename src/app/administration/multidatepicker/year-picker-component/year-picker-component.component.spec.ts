import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearPickerComponentComponent } from './year-picker-component.component';

describe('YearPickerComponentComponent', () => {
  let component: YearPickerComponentComponent;
  let fixture: ComponentFixture<YearPickerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearPickerComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearPickerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

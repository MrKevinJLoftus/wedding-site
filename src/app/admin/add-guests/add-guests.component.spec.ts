import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuestsComponent } from './add-guests.component';

describe('AddGuestsComponent', () => {
  let component: AddGuestsComponent;
  let fixture: ComponentFixture<AddGuestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGuestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGuestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

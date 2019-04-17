import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpReportComponent } from './rsvp-report.component';

describe('RsvpReportComponent', () => {
  let component: RsvpReportComponent;
  let fixture: ComponentFixture<RsvpReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsvpReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

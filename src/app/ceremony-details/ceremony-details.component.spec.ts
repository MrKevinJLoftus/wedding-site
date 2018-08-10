import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeremonyDetailsComponent } from './ceremony-details.component';

describe('CeremonyDetailsComponent', () => {
  let component: CeremonyDetailsComponent;
  let fixture: ComponentFixture<CeremonyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeremonyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeremonyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

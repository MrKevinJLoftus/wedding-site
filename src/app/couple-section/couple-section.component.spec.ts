import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoupleSectionComponent } from './couple-section.component';

describe('CoupleSectionComponent', () => {
  let component: CoupleSectionComponent;
  let fixture: ComponentFixture<CoupleSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoupleSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoupleSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

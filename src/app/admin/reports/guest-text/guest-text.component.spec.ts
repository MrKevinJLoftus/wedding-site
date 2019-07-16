import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestTextComponent } from './guest-text.component';

describe('GuestTextComponent', () => {
  let component: GuestTextComponent;
  let fixture: ComponentFixture<GuestTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

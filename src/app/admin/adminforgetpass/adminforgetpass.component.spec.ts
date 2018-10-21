import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminforgetpassComponent } from './adminforgetpass.component';

describe('AdminforgetpassComponent', () => {
  let component: AdminforgetpassComponent;
  let fixture: ComponentFixture<AdminforgetpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminforgetpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminforgetpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperResetPasswordComponent } from './developer-reset-password.component';

describe('DeveloperResetPasswordComponent', () => {
  let component: DeveloperResetPasswordComponent;
  let fixture: ComponentFixture<DeveloperResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRequestActionComponent } from './app-request-action.component';

describe('AppRequestActionComponent', () => {
  let component: AppRequestActionComponent;
  let fixture: ComponentFixture<AppRequestActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppRequestActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRequestActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

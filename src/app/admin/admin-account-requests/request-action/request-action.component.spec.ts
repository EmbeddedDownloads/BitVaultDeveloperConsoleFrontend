import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestActionComponent } from './request-action.component';

describe('RequestActionComponent', () => {
  let component: RequestActionComponent;
  let fixture: ComponentFixture<RequestActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

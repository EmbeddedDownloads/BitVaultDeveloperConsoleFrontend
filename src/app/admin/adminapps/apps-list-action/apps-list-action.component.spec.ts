import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsListActionComponent } from './apps-list-action.component';

describe('AppsListActionComponent', () => {
  let component: AppsListActionComponent;
  let fixture: ComponentFixture<AppsListActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsListActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsListActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

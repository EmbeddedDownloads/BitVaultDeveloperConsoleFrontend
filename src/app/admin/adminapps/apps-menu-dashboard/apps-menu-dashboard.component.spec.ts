import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsMenuDashboardComponent } from './apps-menu-dashboard.component';

describe('AppsMenuDashboardComponent', () => {
  let component: AppsMenuDashboardComponent;
  let fixture: ComponentFixture<AppsMenuDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsMenuDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsMenuDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

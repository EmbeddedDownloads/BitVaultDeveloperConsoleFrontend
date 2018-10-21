import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsDashboardComponent } from './apps-dashboard.component';

describe('AppsDashboardComponent', () => {
  let component: AppsDashboardComponent;
  let fixture: ComponentFixture<AppsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

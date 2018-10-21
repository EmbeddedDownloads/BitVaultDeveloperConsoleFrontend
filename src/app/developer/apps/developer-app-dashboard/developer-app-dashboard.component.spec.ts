import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperAppDashboardComponent } from './developer-app-dashboard.component';

describe('DeveloperAppDashboardComponent', () => {
  let component: DeveloperAppDashboardComponent;
  let fixture: ComponentFixture<DeveloperAppDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperAppDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperAppDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

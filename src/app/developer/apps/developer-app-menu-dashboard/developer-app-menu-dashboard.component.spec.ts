import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperAppMenuDashboardComponent } from './developer-app-menu-dashboard.component';

describe('DeveloperAppMenuDashboardComponent', () => {
  let component: DeveloperAppMenuDashboardComponent;
  let fixture: ComponentFixture<DeveloperAppMenuDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperAppMenuDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperAppMenuDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

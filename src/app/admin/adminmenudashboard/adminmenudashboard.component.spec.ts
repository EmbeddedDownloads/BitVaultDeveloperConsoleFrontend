import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmenudashboardComponent } from './adminmenudashboard.component';

describe('AdminmenudashboardComponent', () => {
  let component: AdminmenudashboardComponent;
  let fixture: ComponentFixture<AdminmenudashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminmenudashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminmenudashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

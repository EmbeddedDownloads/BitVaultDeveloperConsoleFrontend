import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAppRequestsComponent } from './admin-app-requests.component';

describe('AdminAppRequestsComponent', () => {
  let component: AdminAppRequestsComponent;
  let fixture: ComponentFixture<AdminAppRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAppRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAppRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

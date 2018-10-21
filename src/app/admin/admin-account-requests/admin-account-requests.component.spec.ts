import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccountRequestsComponent } from './admin-account-requests.component';

describe('AdminAccountRequestsComponent', () => {
  let component: AdminAccountRequestsComponent;
  let fixture: ComponentFixture<AdminAccountRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAccountRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAccountRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserActionComponent } from './admin-user-action.component';

describe('AdminUserActionComponent', () => {
  let component: AdminUserActionComponent;
  let fixture: ComponentFixture<AdminUserActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

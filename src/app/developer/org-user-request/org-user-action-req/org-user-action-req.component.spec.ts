import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgUserActionReqComponent } from './org-user-action-req.component';

describe('OrgUserActionReqComponent', () => {
  let component: OrgUserActionReqComponent;
  let fixture: ComponentFixture<OrgUserActionReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgUserActionReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgUserActionReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgUserRequestComponent } from './org-user-request.component';

describe('OrgUserRequestComponent', () => {
  let component: OrgUserRequestComponent;
  let fixture: ComponentFixture<OrgUserRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgUserRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgUserRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAction } from './useraction.component';

describe('UserAction', () => {
  let component: UserAction;
  let fixture: ComponentFixture<UserAction>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAction ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

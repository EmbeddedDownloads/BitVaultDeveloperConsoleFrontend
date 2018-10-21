import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationServerComponent } from './notification-server.component';

describe('NotificationServerComponent', () => {
  let component: NotificationServerComponent;
  let fixture: ComponentFixture<NotificationServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

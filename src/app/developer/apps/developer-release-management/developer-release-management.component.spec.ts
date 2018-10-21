import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperReleaseManagementComponent } from './developer-release-management.component';

describe('DeveloperReleaseManagementComponent', () => {
  let component: DeveloperReleaseManagementComponent;
  let fixture: ComponentFixture<DeveloperReleaseManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperReleaseManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperReleaseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

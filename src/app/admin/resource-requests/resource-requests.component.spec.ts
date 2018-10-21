import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceRequestsComponent } from './resource-requests.component';

describe('ResourceRequestsComponent', () => {
  let component: ResourceRequestsComponent;
  let fixture: ComponentFixture<ResourceRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

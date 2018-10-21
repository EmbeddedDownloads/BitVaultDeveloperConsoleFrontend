import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceRequestsActionComponent } from './resource-requests-action.component';

describe('ResourceRequestsActionComponent', () => {
  let component: ResourceRequestsActionComponent;
  let fixture: ComponentFixture<ResourceRequestsActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceRequestsActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceRequestsActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAppCategoryComponent } from './admin-app-category.component';

describe('AdminAppCategoryComponent', () => {
  let component: AdminAppCategoryComponent;
  let fixture: ComponentFixture<AdminAppCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAppCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAppCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

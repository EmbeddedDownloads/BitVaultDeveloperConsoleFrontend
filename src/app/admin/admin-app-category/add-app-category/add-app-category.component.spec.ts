import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppCategoryComponent } from './add-app-category.component';

describe('AddAppCategoryComponent', () => {
  let component: AddAppCategoryComponent;
  let fixture: ComponentFixture<AddAppCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAppCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

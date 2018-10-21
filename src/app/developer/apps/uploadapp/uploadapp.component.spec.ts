import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadappComponent } from './uploadapp.component';

describe('UploadappComponent', () => {
  let component: UploadappComponent;
  let fixture: ComponentFixture<UploadappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

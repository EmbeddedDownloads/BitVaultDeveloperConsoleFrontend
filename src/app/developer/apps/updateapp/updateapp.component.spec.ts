import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateappComponent } from './updateapp.component';

describe('UpdateappComponent', () => {
  let component: UpdateappComponent;
  let fixture: ComponentFixture<UpdateappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

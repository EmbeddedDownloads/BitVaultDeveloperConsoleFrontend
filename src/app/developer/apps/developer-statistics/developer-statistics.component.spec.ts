import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperStatisticsComponent } from './developer-statistics.component';

describe('DeveloperStatisticsComponent', () => {
  let component: DeveloperStatisticsComponent;
  let fixture: ComponentFixture<DeveloperStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

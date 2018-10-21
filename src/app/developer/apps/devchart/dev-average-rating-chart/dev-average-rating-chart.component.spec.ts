import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevAverageRatingChartComponent } from './dev-average-rating-chart.component';

describe('DevAverageRatingChartComponent', () => {
  let component: DevAverageRatingChartComponent;
  let fixture: ComponentFixture<DevAverageRatingChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevAverageRatingChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevAverageRatingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

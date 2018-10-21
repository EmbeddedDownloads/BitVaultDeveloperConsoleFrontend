import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageRatingLineChartComponent } from './average-rating-line-chart.component';

describe('AverageRatingLineChartComponent', () => {
  let component: AverageRatingLineChartComponent;
  let fixture: ComponentFixture<AverageRatingLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AverageRatingLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageRatingLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadsLineChartComponent } from './downloads-line-chart.component';

describe('DownloadsLineChartComponent', () => {
  let component: DownloadsLineChartComponent;
  let fixture: ComponentFixture<DownloadsLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadsLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadsLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

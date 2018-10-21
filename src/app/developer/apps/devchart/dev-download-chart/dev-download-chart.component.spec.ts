import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevDownloadChartComponent } from './dev-download-chart.component';

describe('DevDownloadChartComponent', () => {
  let component: DevDownloadChartComponent;
  let fixture: ComponentFixture<DevDownloadChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevDownloadChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevDownloadChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

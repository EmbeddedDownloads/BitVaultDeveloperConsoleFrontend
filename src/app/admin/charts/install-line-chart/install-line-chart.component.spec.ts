import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallLineChartComponent } from './install-line-chart.component';

describe('InstallLineChartComponent', () => {
  let component: InstallLineChartComponent;
  let fixture: ComponentFixture<InstallLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevInstallChartComponent } from './dev-install-chart.component';

describe('DevInstallChartComponent', () => {
  let component: DevInstallChartComponent;
  let fixture: ComponentFixture<DevInstallChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevInstallChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevInstallChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

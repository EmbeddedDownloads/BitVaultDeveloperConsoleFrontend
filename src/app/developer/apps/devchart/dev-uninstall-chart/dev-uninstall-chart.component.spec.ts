import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevUninstallChartComponent } from './dev-uninstall-chart.component';

describe('DevUninstallChartComponent', () => {
  let component: DevUninstallChartComponent;
  let fixture: ComponentFixture<DevUninstallChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevUninstallChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevUninstallChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

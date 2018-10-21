import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UninstallLineChartComponent } from './uninstall-line-chart.component';

describe('UninstallLineChartComponent', () => {
  let component: UninstallLineChartComponent;
  let fixture: ComponentFixture<UninstallLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UninstallLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UninstallLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

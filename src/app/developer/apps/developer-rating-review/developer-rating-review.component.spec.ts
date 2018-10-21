import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperRatingReviewComponent } from './developer-rating-review.component';

describe('DeveloperRatingReviewComponent', () => {
  let component: DeveloperRatingReviewComponent;
  let fixture: ComponentFixture<DeveloperRatingReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperRatingReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperRatingReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

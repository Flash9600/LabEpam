import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCourseListComponent } from './custom-course-list.component';

describe('CustomCourseListComponent', () => {
  let component: CustomCourseListComponent;
  let fixture: ComponentFixture<CustomCourseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomCourseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

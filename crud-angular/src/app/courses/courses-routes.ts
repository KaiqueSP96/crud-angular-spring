import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseResolver } from './guards/course.resolver';

export const COURSES_ROUTES: Routes = [
  { path: '', component: CoursesComponent },
  {
    path: 'new',
    component: CourseFormComponent,
    resolve: { course: CourseResolver },
  },
  {
    path: 'edit/:id',
    component: CourseFormComponent,
    resolve: { course: CourseResolver },
  },
];

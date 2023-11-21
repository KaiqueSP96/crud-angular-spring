import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Course } from '../models/course';
import { CoursesService } from '../services/courses.service';

export const courseResolver: ResolveFn<Observable<Course>> = (route, state,  service: CoursesService = inject(CoursesService)) => {

  if (route.params?.['id']){
    return service.carregarPorId(route.params['id']);
  }
  return of({ _id: '', name: '', category: '', lessons: [] });
};

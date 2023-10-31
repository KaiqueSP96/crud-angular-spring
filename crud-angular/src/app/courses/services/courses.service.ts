import { Course } from './../models/course';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) {}

  listarCursos() {
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      tap(courses => console.log(courses)),
      delay(1000)
    );
  }

  carregarPorId(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  salvarCursos (record: Partial<Course>) {
   return this.httpClient.post<Course>(this.API, record).pipe(first());
  }
}

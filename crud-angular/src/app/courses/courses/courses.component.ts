import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Course } from '../models/course';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CoursesListComponent } from '../courses-list/courses-list.component';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
    standalone: true,
    imports: [
    MatCardModule,
    MatToolbarModule,
    CoursesListComponent,
    MatProgressSpinnerModule,
    AsyncPipe
],
})
export class CoursesComponent implements OnInit {

  courses$:Observable <Course[]>;

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog,
    private router: Router
  ) {
     this.courses$ = this.coursesService.listarCursos()
      .pipe(
        catchError(error => {
          this.onError("Erro ao carregar cursos.")
          return of([])
        })
      )

  }


  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
        data: errorMsg
      })
  }

  onAdd() {
    this.router.navigate(['courses/new'])
  }

  onEdit(course: Course) {
    this.router.navigate(['courses/edit', course._id])
  }

  ngOnInit(): void {

  }
}

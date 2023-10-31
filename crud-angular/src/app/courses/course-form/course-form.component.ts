import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { delay } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../models/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form =  this.formBuilder.group({
    _id: [''],
    name: [''],
    category: ['']
  });

  constructor (
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {

  }

  onSubmit(): void {
    this.service.salvarCursos(this.form.value)
      .subscribe(result => this.onSuccess(), erro => {
        this.onError()
      })
  }

  onCancel (): void {
    this.location.back()
  }

  private onSuccess() {
    this.snackBar.open('Curso adicionado com Sucesso!', 'Fechar')._dismissAfter(6000);
    this.onCancel ()
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso.', 'Fechar')
  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    })
  }
}


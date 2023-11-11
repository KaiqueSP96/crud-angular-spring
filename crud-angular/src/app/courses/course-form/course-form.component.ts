import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
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
    name: ['', [Validators.required,
      Validators.minLength(4),
      Validators.maxLength(100)]
    ],
    category: ['', [Validators.required]]
  });

  constructor (
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute){

    }


  onSubmit(): void {
      this.service.salvarCursos(this.form.value).subscribe({
        next: () => this.onSuccess(),
        error: () => this.onError()
      });
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

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if(field?. hasError('required')) {
      return 'Campo Obrigatório'
    }

    if(field?. hasError('minlength')) {
      const requiresLength: number = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser ${requiresLength} caracteres.`;
    }
    return 'Campo Inválido.'
  }
}

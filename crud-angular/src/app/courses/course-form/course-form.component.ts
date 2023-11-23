import { Lesson } from './../models/lesson';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
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


  form!: FormGroup;

  constructor (
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute){

    }

  onSubmit(): void {
      if(this.form.valid) {
        this.service.salvarCursos(this.form.value).subscribe({
          next: () => this.onSuccess(),
          error: () => this.onError()
        });
      } else {
        alert('form inválido')
      }
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

    this.form =  this.formBuilder.group({
      _id: [course._id],
      name: [course.name, [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100)]
      ],
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array(this.retrieveLessons(course), Validators.required)
    });
  }


  private retrieveLessons(course: Course) {
    const lessons = [];
    if(course?.lessons) {
      course.lessons.forEach(lesson => {
        lessons.push(this.createLesson(lesson));
      });
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }


  private createLesson(lesson: Lesson = {id: '', name: '', youtubeUrl: ''}) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name, [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(100)]],
      youtubeUrl: [lesson.youtubeUrl, Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11)]
    })
  }


  addNewLesson() {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  removeLesson( index: number ) {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
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

  isFormArrayIsValid() {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    return !lessons.valid && lessons.hasError('required') && lessons.touched;
  }
}

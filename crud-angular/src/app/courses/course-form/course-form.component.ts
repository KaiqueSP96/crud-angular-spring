import { Lesson } from './../models/lesson';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location, NgIf, NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../models/course';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';


@Component({
    selector: 'app-course-form',
    templateUrl: './course-form.component.html',
    styleUrls: ['./course-form.component.scss'],
    standalone: true,
    imports: [MatCardModule, MatToolbarModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf, MatSelectModule, MatOptionModule, MatButtonModule, MatIconModule, NgFor]
})
export class CourseFormComponent implements OnInit {


  form!: FormGroup;

  constructor (
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
              ){}

  onSubmit(): void {
      if(this.form.valid) {
        this.service.salvarCursos(this.form.value).subscribe({
          next: () => this.onSuccess(),
          error: () => this.onError()
        });
      } else {
        this.formUtils.validadeAllFormFields(this.form);
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


  private createLesson(lesson: Lesson = { id: '', name: '', youtubeUrl: '' }) {
    return this.formBuilder.group({
      _id: [lesson.id],
      name: [
        lesson.name,
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
      ],
      youtubeUrl: [
        lesson.youtubeUrl,
        [Validators.required, Validators.minLength(10), Validators.maxLength(11)]
      ]
    });
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
}

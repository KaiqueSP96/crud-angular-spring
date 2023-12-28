import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../models/course';
import { Router } from '@angular/router';
import { CategoryPipe } from '../../shared/pipes/category.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-courses-list',
    templateUrl: './courses-list.component.html',
    styleUrls: ['./courses-list.component.scss'],
    standalone: true,
    imports: [MatTableModule, MatIconModule, MatButtonModule, CategoryPipe]
})
export class CoursesListComponent {

  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);

  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor(
    private router: Router
  ) {}

  onAdd(){
    this.add.emit(true);
    //this.router.navigate(['courses/new']);
   }

  onEdit(course: Course) {
    this.edit.emit(course);
   }

}

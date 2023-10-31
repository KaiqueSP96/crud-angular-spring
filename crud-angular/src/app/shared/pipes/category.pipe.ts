import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: string): unknown {
    switch(value) {
      case 'Front-end' : return 'html';
      case 'Back-end' : return 'storage';
    }
    return 'html';
  }

}

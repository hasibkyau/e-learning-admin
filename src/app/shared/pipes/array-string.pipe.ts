import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'arrayString'
})
export class ArrayStringPipe implements PipeTransform {

  transform(array: any[], field?: string): string {
    if (array.length) {
      return array.map(m => {
        if (typeof m === 'object') {
          return m[field]
        } else {
          return m;
        }
      }).join(', ')
    } else {
      return 'N/A';
    }

  }

}

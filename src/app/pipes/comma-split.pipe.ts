import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaSplit'
})
export class CommaSplitPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string[] {
    if (!value) {
      return [];
    }

    return value.split(',').map(item => item.trim());
  }

}

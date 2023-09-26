import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'grcNameShorthand',
})
export class NameShorthandPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return value.charAt(0).toUpperCase();
  }
}

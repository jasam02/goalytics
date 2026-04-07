import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatStat',
})
export class FormatStatPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}

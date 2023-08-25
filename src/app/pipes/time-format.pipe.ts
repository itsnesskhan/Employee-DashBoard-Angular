import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: string): string {
    const [hours, minutes] = value.split(':').map(Number);
    const time = new Date();
    time.setHours(hours, minutes, 0, 0);
    
    const formattedTime=  time.toLocaleString('en-US', {
      hour: '2-digit', // Display hours in 2-digit format (24-hour format)
      minute: 'numeric'
    });

    return `${formattedTime} `;
  }

}

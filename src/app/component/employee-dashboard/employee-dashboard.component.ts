import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  ngOnInit() {
    google.charts.load('current', { packages: ['corechart'] });
  }

  generateRandomTime(hoursRange: number, minutesRange: number): number[] {
    const hours = Math.floor(Math.random() * hoursRange);
    const minutes = Math.floor(Math.random() * minutesRange);
    return [hours, minutes, 0];
  }

  drawDayChart() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Task');
    data.addColumn('number', 'Hours');
    data.addColumn({ type: 'string', role: 'style' }); // Column for task colors

    const workHours = this.generateRandomTime(11, 60); // Random work hours and minutes
    const breakHours = this.generateRandomTime(2, 60); // Random break hours and minutes
    let overtimeHours: any;
    if (workHours[0] > 8) {
      overtimeHours = [workHours[0] - 8, workHours[1], 0]; // Calculate overtime
    } else {
      overtimeHours = [0, 0, 0];
    }

    data.addRow(['Work Hours', workHours[0] + workHours[1] / 60, 'color: #4CAF50']);
    data.addRow(['Break Hours', breakHours[0] + breakHours[1] / 60, 'color: #FF5722']);
    data.addRow(['Overtime Hours', overtimeHours[0] + overtimeHours[1] / 60, 'color: #FFC107']);

    const options = {
      title: 'Employee Work, Break, and Overtime Hours (Current Day)',
      width: 500,
      height: 400,
      vAxis: { title: 'Hours' },
      hAxis: { title: 'Task' },
      legend: 'none' 
    };

    const chart = new google.visualization.ColumnChart(this.chartContainer.nativeElement);
    chart.draw(data, options);
  }

  drawWeekChart() {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Day');
    data.addColumn('timeofday', 'Work Hours');
    data.addColumn({ type: 'string', role: 'style' }); // Column for work bar color
    data.addColumn('timeofday', 'Break Hours');
    data.addColumn({ type: 'string', role: 'style' }); // Column for break bar color
    data.addColumn('timeofday', 'Overtime Hours');
    data.addColumn({ type: 'string', role: 'style' }); // Column for overtime bar color

    data.addRows([
      ['Mon', [8, 30, 0], 'color: #4CAF50', [0, 15, 0], 'color: #FF5722', [0, 0, 0], 'color: #FFC107'],
      ['Tue', [9, 45, 0], 'color: #4CAF50', [1, 30, 0], 'color: #FF5722', [1, 0, 0], 'color: #FFC107'],
      ['Wed', [8, 15, 0], 'color: #4CAF50', [0, 10, 0], 'color: #FF5722', [0, 0, 0], 'color: #FFC107'],
      ['Thu', [5, 20, 0], 'color: #4CAF50', [3, 15, 0], 'color: #FF5722', [0, 0, 0], 'color: #FFC107'],
      ['Fri', [10,45,0],'color: #4CAF50', [2, 0, 0], 'color: #FF5722', [2, 0, 0], 'color: #FFC107']
    ]);

    const options = {
      title: 'Employee Work, Break, and Overtime(Week)',
      width: 680,
      height: 400,
      vAxis: { title: 'Hours' },
      hAxis: { title: 'Week' },
      isStacked: 'true'
    };

    const chart = new google.visualization.ColumnChart(this.chartContainer.nativeElement);
    chart.draw(data, options);
}

drawMonthChart() {
  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Day');
  data.addColumn('timeofday', 'Work Hours');
  data.addColumn({ type: 'string', role: 'style' }); // Column for work bar color
  data.addColumn('timeofday', 'Break Hours');
  data.addColumn({ type: 'string', role: 'style' }); // Column for break bar color
  data.addColumn('timeofday', 'Overtime Hours');
  data.addColumn({ type: 'string', role: 'style' }); // Column for overtime bar color

  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  //this calculate number of days in current month

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(new Date().getFullYear(), new Date().getMonth(), day);

    if (date.getDay() !== 0 && date.getDay() !== 6) {
      const workHours = this.generateRandomTime(11, 60); // Random work hours and minutes
      const breakHours = this.generateRandomTime(2, 60); // Random break hours and minutes
      let overtimeHours: any;

      if (workHours[0] > 8) {
        overtimeHours = [workHours[0] - 8, workHours[1], 0]; // Calculate overtime
      } else {
        overtimeHours = [0, 0, 0];
      }

      data.addRow(
        [this.getDayName(date.getDay()),
        [workHours[0], workHours[1], 0], 'color: #4CAF50',
        [breakHours[0], breakHours[1], 0], 'color: #FF5722',
        [overtimeHours[0], overtimeHours[1], 0], 'color: #FFC107']
      );
    }
  }

  const options = {
    title: 'Employee Work, Break, and Overtime (Month)',
    width: 700,
    height: 400,
    vAxis: { title: 'Hours' },
    hAxis: { title: 'Day of Month' },
    isStacked: 'true'
    
  };

  const chart = new google.visualization.ColumnChart(this.chartContainer.nativeElement);
  chart.draw(data, options);
}


getDayName(dayNumber:number){
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return daysOfWeek[dayNumber];
}

displayChart(option: string) {
  let drawFunction;

  if (option === 'day') {
    drawFunction = this.drawDayChart.bind(this);
  } else if (option === 'week') {
    drawFunction = this.drawWeekChart.bind(this);
  }
  else if (option === 'month') {
    drawFunction = this.drawMonthChart.bind(this);
  }

  google.charts.setOnLoadCallback(drawFunction);
}
}

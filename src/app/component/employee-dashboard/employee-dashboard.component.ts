import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PunchData } from 'src/app/model/PuchData';
import { PunchInfoService } from 'src/app/service/punch-info.service';

declare var google: any;

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit{


  empDashName!: string;
  date!: string;
  empCode!: number;
  empName!: string;
  punchData: PunchData[] = []
  encodedName: any;
  totalIN!: number;
  totalOUt!: number;

  workHours:any; 
  breakHours:any;
  overtimeHours: any;

  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;


  constructor(private _punchService: PunchInfoService,
    private _router: ActivatedRoute) {

      
  }


  getCurrentDayData(){
    this.punchData =[];
    this._router.params.subscribe((params) => {
      this.empCode = +params['empCode'];
      this.encodedName = params['empName'];
      this.date = params['date'];

      this.empName = decodeURIComponent(this.encodedName);
      console.log(`dedcoded name ${this.empName}`);
      if (this.empCode && this.date) {
        this._punchService.getPunchDataByempCodeandDate(this.empCode, this.date).subscribe({
          next: (punchData: PunchData[]) => {
            this.punchData = punchData
            console.log(this.punchData)
            let drawFunction = this.drawDayChart.bind(this);
            google.charts.setOnLoadCallback(drawFunction);
            this.empDashName = this.punchData[0].employeeName
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
      else if (this.empName && this.date) {
        this._punchService.getPunchDataByNameandDate(this.empName, this.date).subscribe({
          next: (punchData: PunchData[]) => {
            this.punchData = punchData;
            this.empDashName = this.punchData[0].employeeName
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    });
  }

  getCurrentWeekData(){
    this.punchData =[];
    this._router.params.subscribe((params) => {
      this.empCode = +params['empCode'];
      this.encodedName = params['empName'];
      this.date = params['date'];

      this.empName = decodeURIComponent(this.encodedName);
      console.log(`dedcoded name ${this.empName}`);
      if (this.empCode && this.date) {
        this._punchService.getPunchDataOfWeekByempCodeandDate(this.empCode, this.date).subscribe({
          next: (punchData: PunchData[]) => {
            this.punchData = punchData
            console.log(this.punchData)
            let drawFunction = this.drawWeekChart.bind(this);
            google.charts.setOnLoadCallback(drawFunction);
            this.empDashName = this.punchData[0].employeeName
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
      else if (this.empName && this.date) {
        this._punchService.getPunchDataByNameandDate(this.empName, this.date).subscribe({
          next: (punchData: PunchData[]) => {
            this.punchData = punchData;
            this.empDashName = this.punchData[0].employeeName
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    });
  }

  getCurrentMonthData(){
    this.punchData =[];
    this._router.params.subscribe((params) => {
      this.empCode = +params['empCode'];
      this.encodedName = params['empName'];
      this.date = params['date'];

      this.empName = decodeURIComponent(this.encodedName);
      console.log(`dedcoded name ${this.empName}`);
      if (this.empCode && this.date) {
        this._punchService.getPunchDataOfMonthByempCodeandDate(this.empCode, this.date).subscribe({
          next: (punchData: PunchData[]) => {
            this.punchData = punchData
            console.log(this.punchData)
            let drawFunction = this.drawMonthChart.bind(this);
            google.charts.setOnLoadCallback(drawFunction);
            this.empDashName = this.punchData[0].employeeName
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
      else if (this.empName && this.date) {
        this._punchService.getPunchDataByNameandDate(this.empName, this.date).subscribe({
          next: (punchData: PunchData[]) => {
            this.punchData = punchData;
            this.empDashName = this.punchData[0].employeeName
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    });
  }

  ngOnInit() {
    google.charts.load('current', { packages: ['corechart'] });
    this.displayChart('day')
  }

  getTime(time:string) {
      const [hour, min] = time.split(":");
      return [parseInt(hour, 10), parseInt(min, 10), 0];
  }

  drawDayChart() {

    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Task');
    data.addColumn('number', 'Hours');
    data.addColumn({ type: 'string', role: 'style' }); // Column for task colors

    this.workHours = this.getTime(this.punchData[0].inDuration); // Random work hours and minutes
    this.breakHours = this.getTime(this.punchData[0].outDuration); // Random break hours and minutes
    if (this.workHours[0] >= 8) {
      this.overtimeHours = [this.workHours[0] - 8, this.workHours[1], 0]; // Calculate overtime
    } else {
      this.overtimeHours = [0, 0, 0];
    }

    data.addRow(['Work Hours', this.workHours[0] + this.workHours[1] / 60, 'color: #4CAF50']);
    data.addRow(['Break Hours', this.breakHours[0] + this.breakHours[1] / 60, 'color: #FF5722']);
    data.addRow(['Overtime Hours', this.overtimeHours[0] + this.overtimeHours[1] / 60, 'color: #FFC107']);

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

  public getDayOfWeek(index: number): string | null {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  
    if (index >= 0 && index < daysOfWeek.length) {
      return daysOfWeek[index];
    } else {
      return null; // Return null for invalid indexes
    }
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


    const chartData:any[] = [];

this.punchData.forEach((item, index) => {
    this.workHours = this.getTime(item.inDuration);
    this.breakHours = this.getTime(item.outDuration);
    this.overtimeHours = [this.workHours[0] - 8, this.workHours[1], 0];

    console.log(`induration ${this.workHours} outduration ${this.breakHours}  overtime ${this.overtimeHours}`)
    if((this.workHours[0]-8)<0){
      this.overtimeHours = [0, 0 ,0]
    }
    chartData.push([
        this.getDayOfWeek(index), // Assuming you have a function to get the day of the week
        this.workHours,
        'color: #4CAF50',
        this.breakHours,
        'color: #FF5722',
        this.overtimeHours,
        'color: #FFC107'
    ]);
});

const options = {
  title: 'Employee Work, Break, and Overtime(Week)',
  width: 680,
  height: 400,
  vAxis: { title: 'Hours',color:"#4CAF50" },
  hAxis: { title: 'Week' },
  isStacked: 'true'
};

  data.addRows(chartData, options);

    

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

    for (let day = 0; day < this.punchData.length; day++) {
      const punchEntry = this.punchData[day];
      const date = new Date(punchEntry.attendanceDate); // Assuming each punchData item has a 'date' property

      if (date.getDay() !== 0 && date.getDay() !== 6) {
        const workHours = this.getTime(punchEntry.inDuration);
        const breakHours = this.getTime(punchEntry.outDuration);
        let overtimeHours: any;

        if (workHours[0] > 8) {
          overtimeHours = [workHours[0] - 8, workHours[1], workHours[2]]; // Calculate overtime
        } else {
          overtimeHours = [0, 0, 0];
        }

        data.addRow([
          this.getDayName(date.getDay()),
          [workHours[0], workHours[1], workHours[2]], 'color: #4CAF50',
          [breakHours[0], breakHours[1], breakHours[2]], 'color: #FF5722',
          [overtimeHours[0], overtimeHours[1], overtimeHours[2]], 'color: #FFC107'
        ]);
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


  getDayName(dayNumber: number) {
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return daysOfWeek[dayNumber];
  }

  displayChart(option: string) {
    let drawFunction;


    if (option === 'day') {
      this.getCurrentDayData()
    } else if (option === 'week') {
      this.getCurrentWeekData();
    }
    else if (option === 'month') {
      this.getCurrentMonthData();
    }
  }


}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PunchInfoService } from 'src/app/service/punch-info.service';
import { ActivatedRoute } from '@angular/router'
import { PunchData } from 'src/app/model/PuchData';
import { Time } from '@angular/common';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  empDashName!: string;
  date!: string;
  empCode!: number;
  empName!: string;
  punchData: PunchData[] = []
  encodedName: any;
  totalIN!:number;
  totalOUt!:number;

  constructor(private punchService: PunchInfoService,
    private _router: ActivatedRoute
  ) { }



  ngOnInit(): void {
    this._router.params.subscribe((params) => {
      this.empCode = +params['empCode'];
      this.encodedName = params['empName'];
      this.date = params['date'];

      this.empName = decodeURIComponent(this.encodedName);
      console.log(`dedcoded name ${this.empName}`);
      if (this.empCode && this.date) {
        this.punchService.getPunchDataByempCodeandDate(this.empCode, this.date).subscribe({
          next: (punchData: PunchData[]) => {
            this.punchData = punchData
            console.log(this.punchData)
            this.empDashName = this.punchData[0].employeeName
            punchData.forEach(element => {
              this.getClockedTime(element)
            });
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
      else if (this.empName && this.date) {
        this.punchService.getPunchDataByNameandDate(this.empName, this.date).subscribe({
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

  isLessThan8Hours(timeString: string): boolean {
    const [hours, minutes] = timeString.split(':').map(Number);

    const time = new Date();
    time.setHours(hours, minutes, 0, 0);

    return time.getHours() < 8;
  }

  isGreaterThan8Hours(timeString: string): boolean {
    const [hours, minutes] = timeString.split(':').map(Number);
    const time = new Date();
    time.setHours(hours, minutes, 0, 0);
    return time.getHours() >= 8;
  }

  getClockedTime(punchData:PunchData){
   let data = punchData.punchRecords.split(",").map(item=> item.includes('in'));
   let totalCount = data.filter(item => item === true).length;
   this.totalIN = totalCount;
   console.log("Total 'in' occurrences:", totalCount);

   let data2 = punchData.punchRecords.split(",").map(item=> item.includes('out'));
   let totalOut = data.filter(item => item === true).length;
   this.totalOUt = totalOut;
   console.log("Total 'out' occurrences:", totalOut);
 
  }


}

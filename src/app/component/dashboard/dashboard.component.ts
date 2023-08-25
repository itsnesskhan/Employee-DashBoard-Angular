import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PunchData } from 'src/app/model/PuchData';
import { PunchInfoService } from 'src/app/service/punch-info.service';
import {Router} from '@angular/router'
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  date!:Date;
  empCode!:number;
  empName!:string;
  displayForm:boolean = false;
  byId:boolean = false;
  byName:boolean = false;
  byDateandCode = false;
  punchData:any;
  encodedName:any;
  
  constructor(private punchService:PunchInfoService,
              private _router:Router 
    ){
  }
  ngOnInit(): void {
   //practicing pipe operator
   console.log('on init called')
   this.punchService.getPunchDataByempCode(69).pipe(map(punch=> {
    const transformData:any = []
    punch.forEach(element => {
        transformData.push({'name':element.employeeName,
                            'age':24,
                            'city':'Indore',
                            'id':element.employeeCode
      })
    });
    return transformData;
   })
   )
   .subscribe((data)=>{
    console.log(data)
   })
  }

  public getByCodeandDate(){
    this.byDateandCode = true;
    this.displayForm = true;
  }

  public getEmpByCode(){
    this.byName = false;
    this.byId =true
   this.displayForm = true
  }

  public getEmpByName(){
    this.byId = false;
    this.byName = true;
    this.displayForm = true
   }
  

   searchEmp(){
 // Define options for formatting
 const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// Get day, month, and year components
const day = this.date.getDate();
const month = monthNames[this.date.getMonth()];
const year = this.date.getFullYear();

const formattedDay = day.toString().padStart(2, '0');
// Format the date
const formattedDate = `${formattedDay}-${month}-${year}`;

console.log(`formattedDate ${formattedDate} and name ${this.empName} and orignal datae ${this.date}`)
    if(this.empName && this.date){
        console.log('inside me targeted router')
        this.encodedName = encodeURIComponent(this.empName)
      this._router.navigate([`/employee-details/name/${this.encodedName}/${formattedDate}`])
    }
    else if(this.empCode && this.date)
      this._router.navigate([`/employee-details/code/${this.empCode}/${formattedDate}`])
 
     
   }

 
}

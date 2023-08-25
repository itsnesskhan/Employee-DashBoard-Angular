import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllEmployeeComponent } from './component/all-employee/all-employee.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EmployeeDetailsComponent } from './component/employee-details/employee-details.component';
import { EmployeeDashboardComponent } from './component/employee-dashboard/employee-dashboard.component';

const routes: Routes = [
  {path:'', component:EmployeeDashboardComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'all-employee',component:AllEmployeeComponent},
  {path:'employee-details/empCode/:empCode',component:EmployeeDetailsComponent},
  {path:'employee-details/empName/:empName',component:EmployeeDetailsComponent},
  {path:'employee-details/code/:empCode/:date',component:EmployeeDetailsComponent},
  {path:'employee-details/name/:empName/:date',component:EmployeeDetailsComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

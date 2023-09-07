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
  {path:'employee-details/empCode/:empCode',component:EmployeeDashboardComponent},
  {path:'employee-details/empName/:empName',component:EmployeeDashboardComponent},
  {path:'employee-details/code/:empCode/:date',component:EmployeeDashboardComponent},
  {path:'employee-details/name/:empName/:date',component:EmployeeDashboardComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

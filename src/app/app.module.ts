import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AllEmployeeComponent } from './component/all-employee/all-employee.component'; // Import the BrowserAnimationsModule
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EmployeeDetailsComponent } from './component/employee-details/employee-details.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import {MatCardModule} from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommaSplitPipe } from './pipes/comma-split.pipe';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { NavbarComponent } from './component/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { EmployeeDashboardComponent } from './component/employee-dashboard/employee-dashboard.component';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';



const material = [
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  FormsModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatDividerModule
  
  
]

@NgModule({
  declarations: [
    AppComponent,
    AllEmployeeComponent,
    EmployeeDetailsComponent,
    DashboardComponent,
    CommaSplitPipe,
    TimeFormatPipe,
    NavbarComponent,
    EmployeeDashboardComponent
  ],
  imports: [
    BrowserModule,
    ...material,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

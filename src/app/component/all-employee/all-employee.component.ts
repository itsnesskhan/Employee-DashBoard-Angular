import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PunchData } from 'src/app/model/PuchData';
import { PunchInfoService } from 'src/app/service/punch-info.service';

@Component({
  selector: 'app-all-employee',
  templateUrl: './all-employee.component.html',
  styleUrls: ['./all-employee.component.css']
})
export class AllEmployeeComponent {

  punchData:PunchData[] = []


  dataSource! : MatTableDataSource<PunchData>;

  displayedColumns: string[] = ['sno', 'employeeCode', 'employeeName', 'inDuration', 'outDuration', 'punchRecords','attendanceDate'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  constructor(private punchDataService: PunchInfoService) {}

  ngOnInit() {
    this.fetchPunchData();
  }

  fetchPunchData() {
    this.punchDataService.getPunchData().subscribe((punchData: PunchData[]) => {
      this.dataSource = new MatTableDataSource(punchData);
      this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

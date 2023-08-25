import { Component , ViewChild} from '@angular/core';
import { PunchInfoService } from './service/punch-info.service';
import { PunchData } from './model/PuchData';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 
}

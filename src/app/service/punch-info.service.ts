import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PunchData } from '../model/PuchData';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PunchInfoService {
 
  url:string = 'http://localhost:8080/api'

  constructor(private _http:HttpClient) { }

  public getPunchData():Observable<PunchData[]>{
    return this._http.get<PunchData[]>(`${this.url}/getAttendances`);
  }

  public getPunchDataByempCode(id:number):Observable<PunchData[]>{
    return this._http.get<PunchData[]>(`${this.url}/getAttendanceByEmpCode/${id}`)
  }

  public getPunchDataByempName(name:string):Observable<PunchData[]>{
    return this._http.get<PunchData[]>(`${this.url}/getAttendanceByEmpName/${name}`)
  }

  public getPunchDataByempCodeandDate(empCode:number, date:string):Observable<PunchData[]>{
    return this._http.get<PunchData[]>(`${this.url}/getAttendanceByEmpCodeAndDate/${empCode}/${date}`)
  }

  public getPunchDataOfWeekByempCodeandDate(empCode:number, date:string):Observable<PunchData[]>{
    return this._http.get<PunchData[]>(`${this.url}/getAttendanceOfWeekByEmpCodeAndDate/${empCode}/${date}`)
  }

  public getPunchDataOfMonthByempCodeandDate(empCode:number, date:string):Observable<PunchData[]>{
    return this._http.get<PunchData[]>(`${this.url}/getAttendanceOfMonthByEmpCodeAndDate/${empCode}/${date}`)
  }


  public getPunchDataByNameandDate(empName:string, date:string):Observable<PunchData[]>{
    return this._http.get<PunchData[]>(`${this.url}/getAttendanceByEmpNameAndDate/${empName}/${date}`)
  }


  

}

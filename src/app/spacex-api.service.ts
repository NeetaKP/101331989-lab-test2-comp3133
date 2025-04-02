import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Launch } from './launch.model';

@Injectable({
  providedIn: 'root'
})
export class SpaceXService {

  private url = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) {}

  getLaunchByFlightNumber(flightNumber: string): Observable<Launch> {
    return this.http.get<Launch>(`${this.url}/${flightNumber}`);
  }

  getLaunchByYear(srchYear: string): Observable<Launch[]> {
    return this.http.get<Launch[]>(`${this.url}?launch_year=${srchYear}`);
  }


  getLaunches(): Observable<Launch[]> {
    return this.http.get<Launch[]>(this.url);
  }

}

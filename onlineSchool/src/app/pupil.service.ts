import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pupil } from './pupil';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PupilService {
  private apiServerUrl=environment.apiDBUrl;
  constructor(private http:HttpClient) { }
  public getPupils():Observable<Pupil[]>{
    return this.http.get<Pupil[]>(`${this.apiServerUrl}/pupils/all`);
  }
  public addPupils(pupil:Pupil):Observable<Pupil>{
    return this.http.post<Pupil>(`${this.apiServerUrl}/pupils/add`,pupil);
  }
  public updatePupils(pupil:Pupil):Observable<Pupil>{
    return this.http.put<Pupil>(`${this.apiServerUrl}/pupils/update`,pupil);
  }
  public deletePupils(pupilId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/pupils/delete/${pupilId}`);
  }
}

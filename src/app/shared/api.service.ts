import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators'
import {PatientModel} from "../dashboard-patients/modal-add-patient/modal-add-patient.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postPatients(data:any){
    console.log("postPatient    ", data)
    return this.http.post<any>("https://localhost:44377/api/patients", data)
      .pipe(map((res:any)=>{return res;}))
  }
  getPatients(){
    return this.http.get<any>("https://localhost:44377/api/patients")
      .pipe(map((res:any)=>{return res;}))
  }
  delPatient(id:number){
    return this.http.delete<any>("https://localhost:44377/api/patients/"+id)
      .pipe(map((res:any)=>{return res;}))
  }

  updatePatient(data: any, id: number){
    return this.http.put<any>("https://localhost:44377/api/patients/"+id,data)
      .pipe(map((res:any)=>{return res;}))
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  postVisit(data:any, id: number){
    console.log("postVisit    ", data , id)
    return this.http.post<any>("https://localhost:44377/api/visits/"+id, data)
      .pipe(map((res:any)=>{return res;}))
  }
  getVisits(id:number){
    return this.http.get<any>("https://localhost:44377/api/visits/"+id)
      .pipe(map((res:any)=>{return res;}))
  }
  delVisit(id:number){
    return this.http.delete<any>("https://localhost:44377/api/visits/"+id)
      .pipe(map((res:any)=>{return res;}))
  }

  updateVisit(data: any, id: number){
    return this.http.put<any>("https://localhost:44377/api/visits/"+id,data)
      .pipe(map((res:any)=>{return res;}))
  }
}

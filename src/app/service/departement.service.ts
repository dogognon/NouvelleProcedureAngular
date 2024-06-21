import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { DepartementRequest } from '../payload/DepartementRequest';
import { SortDirection } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  auth_token! : string
  BASE_URL = environment.apiUrl



  constructor(private httpClient: HttpClient) {
   }



  getalldepartement(): Observable<any>{
    var JWTToken = localStorage.getItem("jwtToken")
    if(JWTToken !== null){
      this.auth_token = JWTToken
    }
    const compagniehttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.auth_token
       })
    };
   return this.httpClient.get(this.BASE_URL+"/api/secured/departements",compagniehttpOptions);
   }



  adddepartement(dep : DepartementRequest) :Observable<any> {
    var JWTToken = localStorage.getItem("jwtToken")
     if(JWTToken !== null){
       this.auth_token = JWTToken
     }
    const addcompagniehttpOptions: Object =  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.auth_token
       }),
       responseType: 'text'
    };
    return this.httpClient.post(this.BASE_URL+"/api/secured/departement", dep,addcompagniehttpOptions)
   }


  editdepartement(departement: string,dep : DepartementRequest) :Observable<any> {
    var JWTToken = localStorage.getItem("jwtToken")
     if(JWTToken !== null){
       this.auth_token = JWTToken
     }
    const addcompagniehttpOptions: Object =  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.auth_token
       }),
       responseType: 'text'
    };
    return this.httpClient.put(this.BASE_URL+"/api/secured/departement/"+departement, dep,addcompagniehttpOptions)
   }



   getDepartementById(departement: number) :Observable<any> {
    var JWTToken = localStorage.getItem("jwtToken")
     if(JWTToken !== null){
       this.auth_token = JWTToken
     }
    const addcompagniehttpOptions: Object =  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.auth_token
       }),
       responseType: 'text'
    };
    return this.httpClient.get(this.BASE_URL+"/api/secured/departement/"+departement,addcompagniehttpOptions)
  }

  deletedepartement(departement: string) :Observable<any> {
    var JWTToken = localStorage.getItem("jwtToken")
     if(JWTToken !== null){
       this.auth_token = JWTToken
     }
    const addcompagniehttpOptions: Object =  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.auth_token
       }),
       responseType: 'text'
    };
    return this.httpClient.delete(this.BASE_URL+"/api/secured/departement/"+departement,addcompagniehttpOptions)
   }



}

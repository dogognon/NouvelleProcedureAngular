import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ServiceRequest } from '../payload/ServiceRequest';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  auth_token! : string
  BASE_URL = environment.apiUrl



  constructor(private httpClient: HttpClient) {
   }



  getallservice(): Observable<any>{
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
   return this.httpClient.get(this.BASE_URL+"/api/secured/services",compagniehttpOptions);
   }



  addservice(dep : ServiceRequest) :Observable<any> {
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
    return this.httpClient.post(this.BASE_URL+"/api/secured/service", dep,addcompagniehttpOptions)
   }

   editservice(service: string,servi : ServiceRequest) :Observable<any> {
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
    return this.httpClient.put(this.BASE_URL+"/api/secured/service/"+service, servi,addcompagniehttpOptions)
   }

   deleteposte(poste: string) :Observable<any> {
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
    return this.httpClient.delete(this.BASE_URL+"/api/secured/poste/"+poste,addcompagniehttpOptions)
   }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { DepartementRequest } from '../payload/DepartementRequest';
import { PosteRequest } from '../payload/PosteRequest';

@Injectable({
  providedIn: 'root'
})
export class PosteService {

  auth_token! : string
  BASE_URL = environment.apiUrl



  constructor(private httpClient: HttpClient) {
   }



  getallposte(): Observable<any>{
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
   return this.httpClient.get(this.BASE_URL+"/api/secured/postes",compagniehttpOptions);
   }



  addposte(dep : PosteRequest) :Observable<any> {
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
    return this.httpClient.post(this.BASE_URL+"/api/secured/poste", dep,addcompagniehttpOptions)
   }


  editposte(poste: string,post : PosteRequest) :Observable<any> {
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
    return this.httpClient.put(this.BASE_URL+"/api/secured/poste/"+poste, post,addcompagniehttpOptions)
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

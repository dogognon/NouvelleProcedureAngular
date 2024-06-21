import { Utilisateur } from './../model/Utilisateur';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { DepartementRequest } from '../payload/DepartementRequest';
import { SortDirection } from '@angular/material/sort';
import { RegisterUserRequest } from '../payload/register-user-request';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  auth_token! : string
  BASE_URL = environment.apiUrl



  constructor(private httpClient: HttpClient) {
   }


   updatePrivilege(idsuer:string,rolename:string): Observable<any>{
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
   return this.httpClient.get(this.BASE_URL+"/api/auth/update-privilege/"+idsuer+"/"+rolename,compagniehttpOptions);
   }

   getallutilisateur(): Observable<any>{
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
   return this.httpClient.get(this.BASE_URL+"/api/secured/utilisateurs",compagniehttpOptions);
   }




   register(userReq:RegisterUserRequest):Observable<any>{
    var JWTToken = localStorage.getItem("jwtToken")
    if(JWTToken !== null){
      this.auth_token = JWTToken
    }
   const registerhttpOptions: Object =  {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': this.auth_token
      }),
      responseType: 'text'
   };
    return this.httpClient.post(this.BASE_URL+"/api/auth/register",userReq,registerhttpOptions)
   }


   getallrole(): Observable<any>{
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
   return this.httpClient.get(this.BASE_URL+"/api/secured/roles",compagniehttpOptions);
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
   return this.httpClient.get(this.BASE_URL+"/api/secured/utilisateurs",compagniehttpOptions);
   }





  editutilisateur(utilisateur: string,dep : RegisterUserRequest) :Observable<any> {
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
    return this.httpClient.put(this.BASE_URL+"/api/secured/utilisateur/"+utilisateur, dep,addcompagniehttpOptions)
   }



   getUtilisateurById(utilisateur: number) :Observable<any> {
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
    return this.httpClient.get(this.BASE_URL+"/api/secured/utilisateur/"+utilisateur,addcompagniehttpOptions)
  }

  deleteutilisateur(utilisateur: string) :Observable<any> {
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
    return this.httpClient.delete(this.BASE_URL+"/api/secured/utilisateur/"+utilisateur,addcompagniehttpOptions)
   }



}

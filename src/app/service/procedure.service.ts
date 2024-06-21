import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {

  auth_token! : string
  BASE_URL = environment.apiUrl


  constructor(private http : HttpClient) { }


  uploadProcedure(nom:string, commentaire: string, file: File, listDepartementId: string,listServiceId : string,listPosteId : string): Observable<any> {
    var JWTToken = localStorage.getItem("jwtToken")
     if(JWTToken !== null){
       this.auth_token = JWTToken
     }

    const headers = new HttpHeaders({
      'Authorization': this.auth_token
    });
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('commentaire', commentaire);
    formData.append('document', file);
    formData.append('list_departement_id',listDepartementId);
    formData.append('list_service_id',listServiceId);
    formData.append('list_poste_id',listPosteId);

   const req = new HttpRequest('POST', `${this.BASE_URL}/api/secured/procedure`, formData, {
    reportProgress: true,
    responseType: 'json',
    headers:headers
  });
console.log(req)
  return this.http.request(req);


  }

  getprocedurebydepartement(libelle : string) :Observable<any> {
    var JWTToken = localStorage.getItem("jwtToken")
     if(JWTToken !== null){
       this.auth_token = JWTToken
     }
    const addcompagniehttpOptions: Object =  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.auth_token
       }),
      // responseType: 'text'
    };
    return this.http.get(this.BASE_URL+"/api/secured/procedure_by_departement_libelle/"+ libelle,addcompagniehttpOptions)
   }

   getprocedurebyposte(libelle : string) :Observable<any> {
    var JWTToken = localStorage.getItem("jwtToken")
     if(JWTToken !== null){
       this.auth_token = JWTToken
     }
    const addcompagniehttpOptions: Object =  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.auth_token
       }),
      // responseType: 'text'
    };
    return this.http.get(this.BASE_URL+"/api/secured/procedure_by_poste_libelle/"+ libelle,addcompagniehttpOptions)
   }


   getprocedurebyservice(libelle : string) :Observable<any> {
    var JWTToken = localStorage.getItem("jwtToken")
     if(JWTToken !== null){
       this.auth_token = JWTToken
     }
    const addcompagniehttpOptions: Object =  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.auth_token
       }),
      // responseType: 'text'
    };
    return this.http.get(this.BASE_URL+"/api/secured/procedure_by_service_libelle/"+ libelle,addcompagniehttpOptions)
   }


   downloadFile(url : string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Modifier en fonction du type de contenu attendu
      // Autres en-têtes si nécessaires
    });

    return this.http.get(url, {
      headers: headers,
      responseType: 'blob' // Spécifie que la réponse est attendue sous forme de Blob
    });
  }

  getallProcedure() :Observable<any> {
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
   return this.http.get(this.BASE_URL+"/api/secured/procedures",compagniehttpOptions);
   }



  }

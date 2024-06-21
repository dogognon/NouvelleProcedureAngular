import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { AppUser } from '../model/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  auth_token! : string
  BASE_URL = environment.apiUrl


  loginhttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
   })
};


  authenticatedUser: AppUser | undefined
  rolelist!: Array<string>

  constructor(private http : HttpClient) { }


  login(login: string, password: string) :Observable<any> {
    return this.http.post(this.BASE_URL+"/api/auth/tokenbyloginandpassword",{login: login,password: password},this.loginhttpOptions)
   }


   logout():Observable<boolean> {
    localStorage.removeItem("jwtToken")
    localStorage.removeItem("user")
    this.authenticatedUser = undefined
    return of(true)
  }


   public hasRole(role : string) : boolean{
    var bool : boolean = false
    //console.log(this.authenticatedUser)
    //console.log(this.authenticatedUser!.role)
    //this.authenticatedUser!.role.forEach((ro:any)=>{
      if(this.authenticatedUser!.role.includes(role)){
        bool = true;
    //  }
    }
  //)
    return bool
  }

   AuthenticateUser(data: any) :Observable<boolean> {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(data.accessToken)
    if(helper.isTokenExpired(data.accessToken)){
      return of(false)
    }else{
      this.authenticatedUser = <AppUser>{
        nameuser: decodedToken.iss,
        rolesuser:decodedToken.roles,
        phoneuser: decodedToken.phone,
        emailuser: decodedToken.email,
        expirationToken:decodedToken.exp,
        role: decodedToken.scope,
      }
      const jwttokenuser = data.tokenType+" "+data.accessToken
      localStorage.setItem("user",JSON.stringify(this.authenticatedUser))
      localStorage.setItem("jwtToken",jwttokenuser)
      return of(true)
    }
 }

 public isAuthenticated(){
  if (typeof localStorage !== 'undefined') {
    var JWTToken = localStorage.getItem("jwtToken")

  if(JWTToken !== null){
    this.auth_token = JWTToken
  }
  var user = localStorage.getItem("user")
  if(user !== null){
    this.authenticatedUser = JSON.parse(user)
  }
}
  return this.authenticatedUser!= undefined
}

}

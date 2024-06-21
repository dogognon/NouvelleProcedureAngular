import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UtilService } from '../service/util.service';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { LoggedBoneComponent } from '../logged-bone/logged-bone.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatProgressBarModule,
    NgxExtendedPdfViewerModule,
    MatGridListModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    LoggedBoneComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginformgroup! : FormGroup
  errorMessage : string = ""


  constructor(private formBuilder : FormBuilder, private authservice : AuthService,private router : Router,public utilServ:UtilService) {

  }

ngOnInit(): void {
  this.loginformgroup = this.formBuilder.group(
    {
      username : this.formBuilder.control("", [Validators.required, Validators.email]),
      password : this.formBuilder.control("", [Validators.required, Validators.minLength(1)])
    }
  )

}




  handleLogin(){
    let username = this.loginformgroup.value.username
    let password = this.loginformgroup.value.password
    this.authservice.login(username,password).subscribe({
      next : (data)=>{
      this.authservice.AuthenticateUser(data).subscribe({
        next :  (data)=>{
          this.router.navigateByUrl("/procedure")
        },})
      },
      error : (err)=>{
        if(err.status===401){
          this.errorMessage = "Le nom d'utilisateur et le mot de passe n'ont pas été reconnus. Veuillez réessayer."
        }
      }
    })

  }

}

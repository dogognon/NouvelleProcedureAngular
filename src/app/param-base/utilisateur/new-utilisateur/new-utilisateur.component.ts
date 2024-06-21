import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PosteService } from '../../../service/poste.service';
import { Poste } from '../../../model/poste';
import { Role } from '../../../model/role';
import { AuthService } from '../../../service/auth.service';
import { RegisterUserRequest } from '../../../payload/register-user-request';
import { UtilisateurService } from '../../../service/utilisateur.service';

@Component({
  selector: 'app-new-utilisateur',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatTreeModule,
    MatDialogModule,
    MatIconModule,
    MatExpansionModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatProgressBarModule,
    NgxExtendedPdfViewerModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule
  ],
  templateUrl: './new-utilisateur.component.html',
  styleUrl: './new-utilisateur.component.css'
})
export class NewUtilisateurComponent {
  utilisateurRequest!:RegisterUserRequest
  nomprenoms!:string
  phone!:string
  email!:string
  password!:string
  poste!:Poste
  postesList!:Poste[]
  role!:Role
  rolesList!:Role[]


    constructor( public dialogRef: MatDialogRef<NewUtilisateurComponent>, private utilservice : UtilisateurService,private post : PosteService) {
      //console.log(libelle)
    }

    ngAfterViewInit() {
      this.utilservice.getallrole().subscribe({
        next : (data)=>{
          console.log(data)
          this.rolesList = data;
        },
        error : (err)=>{
          if(err.status===401){
            //this.errorMessage = "Bad credentials"
          }
        }
      })
      this.post.getallposte().subscribe({
        next : (data)=>{
          console.log(data)
          this.postesList = data;
        },
        error : (err)=>{
          if(err.status===401){
            //this.errorMessage = "Bad credentials"
          }
        }
      })
    }


    onNoClick(): void {
      this.dialogRef.close();
    }

    save() {
     this.utilisateurRequest = {nomprenoms : this.nomprenoms, email: this.email, telephone: this.phone, poste: this.poste.libelle,isAdmin:false}
     this.utilservice.register(this.utilisateurRequest).subscribe({
      next : (data)=>{
        console.log(data)
       },
       error : (err)=>{
         if(err.status===401){
          // this.errorMessage = "Bad credentials"
         }
       }
     })
     this.dialogRef.close();
      }


}

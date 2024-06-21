import { Component } from '@angular/core';
import { PosteService } from '../../../service/poste.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Services } from '../../../model/services';
import { PosteRequest } from '../../../payload/PosteRequest';
import { ServicesService } from '../../../service/services.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
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

@Component({
  selector: 'app-new-poste',
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
  templateUrl: './new-poste.component.html',
  styleUrl: './new-poste.component.css'
})
export class NewPosteComponent {
  posteRequest!:PosteRequest
  libelle!:string
  service!:Services
  servicesList!:Services[]

    constructor( public dialogRef: MatDialogRef<NewPosteComponent>, private servService : ServicesService,private posteService : PosteService) {
      //console.log(libelle)
    }

    ngAfterViewInit() {
      this.servService.getallservice().subscribe({
        next : (data)=>{
          console.log(data)
          this.servicesList = data;
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
     this.posteRequest = {libelle : this.libelle, service: this.service.libelle}
     this.posteService.addposte(this.posteRequest).subscribe({
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

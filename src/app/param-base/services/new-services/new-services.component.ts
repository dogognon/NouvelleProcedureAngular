import { AfterViewInit, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ServiceRequest } from '../../../payload/ServiceRequest';
import { DepartementService } from '../../../service/departement.service';
import { Departement } from '../../../model/departement';
import { ServicesService } from '../../../service/services.service';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-new-services',
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
  templateUrl: './new-services.component.html',
  styleUrl: './new-services.component.css'
})
export class NewServicesComponent implements AfterViewInit{
  serviceRequest!:ServiceRequest
  libelle!:string
  departement!:Departement
  departementsList!:Departement[]

    constructor( public dialogRef: MatDialogRef<NewServicesComponent>, private servService : ServicesService,private dep : DepartementService) {
      //console.log(libelle)
    }

    ngAfterViewInit() {
      this.dep.getalldepartement().subscribe({
        next : (data)=>{
          console.log(data)
          this.departementsList = data;
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
     this.serviceRequest = {libelle : this.libelle, departement: this.departement.libelle}
     this.servService.addservice(this.serviceRequest).subscribe({
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

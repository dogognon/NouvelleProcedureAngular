import { AfterViewInit, Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
import { Poste } from '../../../model/poste';
import { Services } from '../../../model/services';
import { PosteRequest } from '../../../payload/PosteRequest';
import { PosteService } from '../../../service/poste.service';
import { ServicesService } from '../../../service/services.service';

@Component({
  selector: 'app-edit-poste',
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
  templateUrl: './edit-poste.component.html',
  styleUrl: './edit-poste.component.css'
})
export class EditPosteComponent implements AfterViewInit {

  posteRequest!:PosteRequest
  libelle!:string
  service!:Services
  servicesList!:Services[]
  poste!: Poste

    constructor( public dialogRef: MatDialogRef<EditPosteComponent>, @Inject(MAT_DIALOG_DATA)
    public pos: Poste, private servService : ServicesService,private posteService : PosteService) {
      this.poste = pos
    }

    ngAfterViewInit() {
      this.servService.getallservice().subscribe({
        next : (data)=>{
          console.log("service",data)
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

    editer(pos : Poste) {
     this.posteRequest = {libelle : this.libelle, service: this.service.libelle}
     this.posteService.editposte(this.poste.id,this.posteRequest).subscribe({
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

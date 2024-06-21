import { Component, Inject } from '@angular/core';
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
import { Services } from '../../../model/services';
import { ServicesService } from '../../../service/services.service';

@Component({
  selector: 'app-delete-services',
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
  templateUrl: './delete-services.component.html',
  styleUrl: './delete-services.component.css'
})
export class DeleteServicesComponent {


  services!: Services

  constructor(public dialogRef: MatDialogRef<DeleteServicesComponent>,
    @Inject(MAT_DIALOG_DATA)
    public serv: Services,
    private serviceService : ServicesService) {
      this.services = serv
    }

    delete(serv:Services){
      this.serviceService.deleteposte(this.serv.id).subscribe({
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
       onNoClick(): void {
        this.dialogRef.close();
      }


}

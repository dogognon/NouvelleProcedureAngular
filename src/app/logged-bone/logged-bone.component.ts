import { Component } from '@angular/core';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ParamBaseComponent } from '../param-base/param-base.component';
import { ListProcedureComponent } from '../procedure/list-procedure/list-procedure.component';
import { NewProcedureComponent } from '../procedure/new-procedure/new-procedure.component';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logged-bone',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatCheckboxModule,
    MatTreeModule,
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
    MatTableModule,
    MatMenuModule,
    CommonModule,
    MatSidenavModule,
    ParamBaseComponent
  ],
  templateUrl: './logged-bone.component.html',
  styleUrl: './logged-bone.component.css'
})
export class LoggedBoneComponent {


  constructor(public dialog: MatDialog,public auth :AuthService) {}


  logout(): void {
    this.auth.logout()
      window.location.reload();
  }
  openDialog() {
    this.dialog.open(NewProcedureComponent, {
      width: '100%',
      minHeight: '70%',
      /*data: {
        animal: 'panda',
      },*/
    });
  }
  openListDialog() {
    this.dialog.open(ListProcedureComponent, {
      width: '100%',
      minHeight: '70%',
      position: {left:'200px'}
    });
}
}

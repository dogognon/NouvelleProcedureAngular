import { FlatTreeControl } from '@angular/cdk/tree';
import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { RouterOutlet } from '@angular/router';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { Departement } from '../model/departement';
import { procedure } from '../model/procedure';
import { DepartementService } from '../service/departement.service';
import { ProcedureService } from '../service/procedure.service';
import { DynamicDataSource, DynamicDatabase, DynamicFlatNode } from './datasource';



@Component({
  selector: 'app-procedure',
  standalone: true,
  imports: [
    RouterOutlet,
    NgxExtendedPdfViewerModule,
    MatGridListModule,
    MatListModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    MatProgressBarModule,
    MatCheckboxModule,
    MatToolbarModule
  ],
  templateUrl: './procedure.component.html',
  styleUrl: './procedure.component.css'
})
export class ProcedureComponent implements AfterViewInit{


  listpdf : procedure[] = [];



  list_departement : Departement[]= [];
  pdfFile:Blob | undefined;



  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;
  database: DynamicDatabase


  constructor(database: DynamicDatabase,private procedureService : ProcedureService,private dep : DepartementService,private cdRef: ChangeDetectorRef) {
    this.database = database;
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);
    this.dataSource.data = database.initialData();
  }

 



  ListePDF(node: DynamicFlatNode){
    console.log(node.item,node.level)
    // level 0 departement
    // level 1 service
    // level 2 poste

    switch (node.level) {
      case 0:
        console.log('departement'+ node.item);
        this.procedureService.getprocedurebydepartement(node.item).subscribe({
          next : (data)=>{
            this.listpdf = data
           console.log(data)
          },
          error : (err)=>{
            if(err.status===401){
             // this.errorMessage = "Bad credentials"
            }
          }
        })
        break;
      case 1:
        console.log('service'+ node.item);
        this.procedureService.getprocedurebyservice(node.item).subscribe({
          next : (data)=>{
            this.listpdf = data
           console.log(data)
          },
          error : (err)=>{
            if(err.status===401){
             // this.errorMessage = "Bad credentials"
            }
          }
        })
        break;
      case 2:
        console.log('poste'+ node.item);
        this.procedureService.getprocedurebyposte(node.item).subscribe({
          next : (data)=>{
            this.listpdf = data
           console.log(data)
          },
          error : (err)=>{
            if(err.status===401){
             // this.errorMessage = "Bad credentials"
            }
          }
        })
        break;
      default:
        console.log('Erreur');
    }
    this.pdfFile = undefined;
  }


seledtedpdf(seledtedpdf:procedure){
  console.log("le fichier"+seledtedpdf.binaire_id.fileName,seledtedpdf.binaire_id.fileDownloadUri)
  this.procedureService.downloadFile(seledtedpdf.binaire_id.fileDownloadUri).subscribe({
    next : (data)=>{
      console.log(data)
      this.pdfFile = data
    },
    error : (err)=>{
      if(err.status===401){
       // this.errorMessage = "Bad credentials"
      }
    }
  })
 //  seledtedpdf.binaire_id.fileDownloadUri

}


ngAfterViewInit() {
  this.dep.getalldepartement().subscribe({
    next : (data)=>{
     //data;
      console.log(data)
      this.database.dataMap.clear();
      this.database.rootLevelNodes.splice(0,this.database.rootLevelNodes.length);
       this.list_departement = data;
       console.log(this.mapDepartementList(data));
       this.database.dataMap = this.mapDepartementList(data);
       data.forEach((dep:Departement) => {
        this.database.rootLevelNodes.push(dep.libelle)
       });


       this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
       this.dataSource = new DynamicDataSource(this.treeControl, this.database);
       this.dataSource.data = this.database.initialData();
    },
    error : (err)=>{
      if(err.status===401){
        //this.errorMessage = "Bad credentials"
      }
    }
  })

  this.cdRef.detectChanges();
}




mapDepartementList(departementList:Departement[] ){

 // Créer un nouveau Map pour stocker les libellés et les services
const resultMap = new Map<string, string[]>();

// Parcourir chaque département
departementList.forEach(departement => {
  // Vérifier si le département a des services
  if (departement.service && departement.service.length > 0) {
    const serviceLibelles: string[] = [];

    // Parcourir chaque service du département
    departement.service.forEach(service => {
      serviceLibelles.push(service.libelle);

      // Vérifier si le service a des postes
      if (service.poste && service.poste.length > 0) {
        const posteLibelles = service.poste.map(poste => poste.libelle);
        resultMap.set(service.libelle, posteLibelles);
      }
    });

    // Ajouter les libellés de service au Map pour le département
    resultMap.set(departement.libelle, serviceLibelles);
  }
});

return resultMap;
}



}

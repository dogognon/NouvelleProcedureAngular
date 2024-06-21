import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { LoggedBoneComponent } from './logged-bone/logged-bone.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule,LoginComponent,LoggedBoneComponent,LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'NouvelleProcedure';
  preloaderLoaded: boolean = false;
 

  constructor() {}

  ngOnInit(): void {
     // Simuler un délai de chargement pour l'animation (vous pouvez le remplacer par une véritable logique de chargement)
     setTimeout(() => {
      this.preloaderLoaded = true;
    }, 2000); // ajustez le délai selon vos besoins
  }
}

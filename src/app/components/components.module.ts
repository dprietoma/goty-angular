import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgChartsModule } from 'ng2-charts';

import { NavbarComponent } from './navbar/navbar.component';
import { GraficoBarraComponent } from './grafico-barra/grafico-barra.component';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from 'src/environment/environment';



@NgModule({
  declarations: [
    NavbarComponent,
    GraficoBarraComponent
  ],
  exports: [
    NavbarComponent,
    GraficoBarraComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
function provideFirebaseApp(arg0: () => any): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

function provideFirestore(arg0: () => any): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

function getFirestore(): any {
  throw new Error('Function not implemented.');
}


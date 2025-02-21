import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormularioComponent,
    EncabezadoComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent{
    title = 'FormTest';
}

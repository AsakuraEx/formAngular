import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { TablaDatosComponent } from './components/tabla-datos/tabla-datos.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormularioComponent,
    EncabezadoComponent,
    TablaDatosComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'FormTest';
}

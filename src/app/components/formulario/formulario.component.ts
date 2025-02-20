import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Procedimiento } from '../../../model/procedimiento';
import axios from 'axios';

@Component({
  selector: 'app-formulario',
  imports: [FormsModule],
  templateUrl: './formulario.component.html'
})
export class FormularioComponent {

  formData:Procedimiento = {
    codigo: '',
    nombre: '',
    tipo: ''
  }

  error = {
    codigo: '',
    nombre: '',
    tipo: '',
    catch: ''
  }

  codigosError: Record<string, string> = {
    'Network Error': 'Ocurrió un error en la red.'
  }

  exito:boolean = false

  async SubmitEventHandler() {

    if(this.formData.codigo === '' || this.formData.codigo == null){
      this.error.codigo = "El campo código es requerido."
      return
    }

    if(this.formData.nombre === '' || this.formData.nombre == null){
      this.error.nombre = "El campo procedimiento es requerido."
      return
    }

    if(this.formData.tipo === '' || this.formData.tipo == null){
      this.error.tipo = "Seleccione un tipo de procedimiento."
      return
    }

    try {
      const { status } = await axios.post('http://localhost:3000/procedimientos', this.formData)

      if (status === 201){
        this.exito = true
        this.error.catch = ''

        Object.assign(this.formData, {
          codigo: '',
          nombre: '',
          tipo: ''
        })

        setTimeout(()=>{
          this.exito = false
        }, 3000)
      }

    } catch (err) {
      this.error.catch = this.codigosError[(err as Error).message] || 'Error desconocido'
    }

  }

}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Procedimiento } from '../../../model/procedimiento';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

@Component({
  selector: 'app-formulario',
  imports: [FormsModule],
  templateUrl: './formulario.component.html'
})
export class FormularioComponent implements OnInit {
  // Variables
  datos:Procedimiento[] = []
  
  baseUrl:string = 'http://192.168.1.2:3000'

  formData:Procedimiento = {
    codigo: '',
    nombre: '',
    tipo: '',
    id: ''
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

  exito:string = ''

  // Metodos 
  async ngOnInit(): Promise<void> {
    this.datos = await this.ObtenerDatos()
  }

  async ObtenerDatos(): Promise<Procedimiento[]> {
    try {
      
      const {status, data} = await axios.get<Procedimiento[]>(this.baseUrl+'/procedimientos')
      
      if(status === 200){
        return data
      } else {
        return []
      }

    } catch (error) {
        console.error(error)
        return []
    }
  }

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

    this.formData.id = uuid().split('-')[0].substring(0,6)

    try {
      const { status } = await axios.post(this.baseUrl+'/procedimientos', this.formData)

      if (status === 201){
        this.exito = 'Se registro el procedimiento exitosamente'
        this.error.catch = ''

        Object.assign(this.formData, {
          codigo: '',
          nombre: '',
          tipo: '',
          id: ''
        })

        this.datos = await this.ObtenerDatos()

        setTimeout(()=>{
          this.exito = ''
        }, 3000)
      }



    } catch (err) {
      this.error.catch = this.codigosError[(err as Error).message] || 'Error desconocido'
    }

  }

  async DeleteItem(id:string): Promise<void> {

    try {
      const { status } = await axios.delete(this.baseUrl+`/procedimientos/${id}`)

      if (status === 200){
        this.exito = 'Se elimino el procedimiento exitosamente'
        this.error.catch = ''

        this.datos = await this.ObtenerDatos()

        setTimeout(()=>{
          this.exito = ''
        }, 3000)
      }

    } catch (err) {
      this.error.catch = this.codigosError[(err as Error).message] || 'Error desconocido'
    }
  }

}

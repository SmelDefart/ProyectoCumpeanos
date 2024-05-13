import { PersonaService } from './services/persona/persona.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {Component, Input} from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Persona } from './classes/persona'
import { Observable, lastValueFrom } from 'rxjs';
import { error } from 'console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private persona : PersonaService){}

  ngOnInit(){
    this.loadPersonas().then(p => this.personas = p);
  }

  personaForm: Persona = {id:0, nombre:"", apellido:"", dni:"", nacimiento: "", confirmado: false};

  personas: Persona[] = [];
  confirmados: Persona[] = [];

  accion: String = "Agregar";

  eliminarDisabled: boolean = true;

  serverResponse: String = "";

  drop(event: CdkDragDrop<Persona[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  modify(item: Persona){
    this.accion = "Modificar"
    this.personaForm.id = item.id;
    this.personaForm.nombre = item.nombre;
    this.personaForm.apellido = item.apellido;
    this.personaForm.dni = item.dni;
    this.personaForm.nacimiento = item.nacimiento;
    this.eliminarDisabled = false;
    this.serverResponse = "";
  }

  nuevo(){
    this.accion = "Agregar"
    this.eliminarDisabled = true;
    this.personaForm.id = 0;
    this.personaForm.nombre = "";
    this.personaForm.apellido = "";
    this.personaForm.dni = "";
    this.personaForm.nacimiento = "";
    this.serverResponse = "";
  }

  guardar(id: string, nombre: string, apellido: string, dni: string, nacimiento: string){
    if(this.accion == "Agregar"){
      var per: Persona = {id: 0, nombre: nombre, apellido, dni: dni, nacimiento: nacimiento, confirmado: false};
      this.persona.addPersona(per).subscribe(() => this.ngOnInit(), error => this.serverResponse = error.error);
    } else {
      var per: Persona = {id: parseInt(id), nombre: nombre, apellido: apellido, dni: dni, nacimiento: nacimiento, confirmado: false};
      this.persona.updatePersona(per).subscribe(() => this.ngOnInit(), error => this.serverResponse = error.error);
    }
    this.nuevo();
  }

  eliminar(id: string){
    this.persona.deletePersona(parseInt(id)).subscribe(() => this.ngOnInit(), error => this.serverResponse = error.error);
    this.nuevo();
  }

  invitar(){
    this.confirmados.forEach(c => {
      c.confirmado = true;
    });
    this.persona.updatePersonas(this.confirmados).subscribe(response => {this.ngOnInit(); this.serverResponse = response});
    this.confirmados = [];
    this.nuevo();
  }

  public async loadPersonas() {
    const personas$ = this.persona.getAllPersonas();
    return await lastValueFrom(personas$);
  }
}

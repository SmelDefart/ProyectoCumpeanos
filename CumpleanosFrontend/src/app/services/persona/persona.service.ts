import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Persona } from '../../classes/persona'
import { Observable, exhaustMap, flatMap, from, map, mergeMap } from "rxjs";


@Injectable({providedIn : 'root'})
export class PersonaService{
  constructor(private http: HttpClient){}

  url: string = "http://localhost:8080/persona";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getPersona(id : number){
    var persona;
    this.http.get(this.url + "/" + id).subscribe(p => persona = p);
    return persona;
  }

  getAllPersonas(): Observable<Persona[]>{
    return this.http.get<Persona[]>(this.url);
  }

  deletePersona(id:number): Observable<Object>{
    return this.http.delete(this.url + "/" + id, {responseType:'text'});
  }

  addPersona(per: Persona): Observable<Object>{
    return this.http.post(this.url, JSON.stringify(per), this.httpOptions);
  }

  updatePersona(per: Persona): Observable<Object>{
    return this.http.put(this.url, JSON.stringify(per), this.httpOptions);
  }

  updatePersonas(per: Persona[]): Observable<String>{
    return this.http.put(this.url + "/confirmar", JSON.stringify(per), {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType:'text'});
  }
}

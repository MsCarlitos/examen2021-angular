import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Usuario } from '../interfaces/usuarios.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
   return  this.http.get<Usuario[]>(`${this.baseUrl}/heroes`);
  }
  getUsuarioPorId(id: string):Observable<Usuario>{
    return this.http.get<Usuario>(`${this.baseUrl}/heroes/${id}`)
  }
  getSugerencias(termino:string):Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.baseUrl}/heroes?q=${termino}&_limit=6`)
  }
  agregarUsuario(usuario: Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(`${this.baseUrl}/heroes`,usuario);
  }
  actualizarUsuario(usuario: Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(`${this.baseUrl}/heroes/${usuario.uid}`,usuario);
  }
  borrarUsuario(id: string):Observable<any>{
    return this.http.delete<Usuario>(`${this.baseUrl}/heroes/${id}`);
  }
}

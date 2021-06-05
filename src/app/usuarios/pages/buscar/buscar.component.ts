import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Usuario } from '../../interfaces/usuarios.interface';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent implements OnInit {
  termino: string = '';
  usuarios: Usuario[] = [];
  usuarioSeleccionado: Usuario | undefined;

  constructor(private usuarioService: UsuariosService) {}

  ngOnInit(): void {}
  buscando() {
    this.usuarioService
      .getSugerencias(this.termino)
      .subscribe((usuario) => (this.usuarios = usuario));
  }
  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if(!event.option.value){
      this.usuarioSeleccionado = undefined;
      return
    }
    const usuario: Usuario = event.option.value;
    this.termino = usuario.name;

    this.usuarioService
      .getUsuarioPorId(usuario.uid!)
      .subscribe((usuario) => (this.usuarioSeleccionado = usuario));
  }
}

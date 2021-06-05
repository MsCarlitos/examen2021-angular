import { Component, Input } from '@angular/core';
import { Usuario } from '../../interfaces/usuarios.interface';

@Component({
  selector: 'app-usuario-tarjeta',
  templateUrl: './usuario-tarjeta.component.html',
  styles: [
    `
      img {
        width: 100%;
      }
      mat-card{
        margin-top:20px;
      }
    `
  ],
})

export class UsuarioTarjetaComponent {

  @Input() usuario!: Usuario;

}

import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../interfaces/usuarios.interface';

@Pipe({
  name: 'imagen',
  pure:false
})
export class ImagenPipe implements PipeTransform {
  transform(usuario: Usuario): string {
    if (!usuario.id && !usuario.alt_img) {
      return `assets/no-image.png`;
    } else if (usuario.alt_img) {
      return usuario.alt_img;
    } else {
      return `assets/heroes/${usuario.id}.jpg`;
    }
  }
}

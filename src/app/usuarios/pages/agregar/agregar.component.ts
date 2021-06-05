import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Usuario } from '../../interfaces/usuarios.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 75%;
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];
  usuario: Usuario = {
    uid: '',
    name: '',
    email: '',
  };
  constructor(
    private usuarioService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.usuarioService.getUsuarioPorId(id)))
      .subscribe((usuario) => (this.usuario = usuario));
  }

  guardar() {
    if (this.usuario.name.trim().length === 0) {
      return;
    }
    if (this.usuario.uid) {
      this.usuarioService
        .actualizarUsuario(this.usuario)
        .subscribe((usuario) => this.mostrarSnckBar('Registro Actualizado'));
    } else {
      this.usuarioService.agregarUsuario(this.usuario).subscribe((usuario) => {
        this.router.navigate(['/usuarios/editar', usuario.uid]);
        this.mostrarSnckBar('Registro Guardado');
      });
    }
  }
  borrar() {
    const dialog = this.dialog.open(ConfirmarComponent, {width:'300px', data:this.usuario});
    dialog.afterClosed().subscribe((result)=>{
      if(result){
        this.usuarioService.borrarUsuario(this.usuario.uid!).subscribe((resp) => {
          this.mostrarSnckBar('Registro Eliminado');
          this.router.navigate(['/usuarios'])
        });
      }
    })
  }
  mostrarSnckBar(mensaje: string) {
    this.snackBar.open(mensaje, 'cerrar', {
      duration: 2500,
    });
  }
}

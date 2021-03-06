import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '../../interfaces/usuarios.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [],
})
export class ConfirmarComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario
  ) {}

  ngOnInit(): void {
    console.log(this.data)
  }
  borrar() {
    this.dialogRef.close(true);
  }
  cancelar() {
    this.dialogRef.close();
  }
}

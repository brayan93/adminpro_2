import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styles: []
})
export class ProfileComponent implements OnInit {

    usuario: Usuario;

    imagenSubir: File;

    imagenTemp: string;

    constructor(public usuarioService: UsuarioService) {

        this.usuario = this.usuarioService.usuario;

    }

    ngOnInit() {
    }

    guardar(forma: FormGroup) {
        if (forma.invalid) {
            return;
        }

        if (this.usuario.google) {
            swal('Peticion no aceptada', 'los usuarios de google no pueden modificar el correo', 'warning');
            return;
        }

        console.log(forma.value);

        this.usuario.nombre = forma.value.nombre;
        this.usuario.email = forma.value.email;

        this.usuarioService.actualizarUsuario(this.usuario).subscribe();
    }

    seleccionImagen(archivo: File) {
        if (!archivo) {
            this.imagenSubir = null;
            return;
        }

        if (archivo.type.indexOf('image') < 0) {
            swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
            this.imagenSubir = null;
            return;
        }


        this.imagenSubir = archivo;

        const reader = new FileReader();
        const urlImagenTemp = reader.readAsDataURL(archivo);

        reader.onloadend = () => this.imagenTemp = reader.result;

    }

    cambiarImagen() {

        this.usuarioService.cambairImagen(this.imagenSubir, this.usuario._id);

    }

}

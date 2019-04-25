import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    usuario: Usuario;
    token: string;

    constructor(
        public http: HttpClient,
        public router: Router,
        public subirArchivoService: SubirArchivoService
    ) {
        this.carcarStorage();
    }

    estaLogueado() {
        return ( this.token.length > 5 ) ? true : false;
    }

    carcarStorage() {
        if (localStorage.getItem('token')) {
            this.token = localStorage.getItem('token');
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
        } else {
            this.token = '';
            this.usuario = null;
        }
    }

    guardarStorage( id: string, token: string, usuario: Usuario ) {

        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));

        this.usuario = usuario;
        this.token = token;

    }

    logout() {
        this.usuario = null;
        this.token = '';

        localStorage.removeItem('id');
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');

        this.router.navigate(['/login']);
    }

    loginGoogle(token: string) {

        let url = URL_SERVICIOS;
        url += '/login/google';

        return this.http.post(url, {token}).pipe(
            map((resp: any) => {
                this.guardarStorage(resp.id, resp.token, resp.usuario);
                return true;
            })
        );

    }

    login(usuario: Usuario, recordar: boolean = false) {
        let url = URL_SERVICIOS;
        url += '/login';
        if (recordar) {
            localStorage.setItem('email', usuario.email);
        } else {
            localStorage.removeItem('email');
        }

        return this.http.post(url, usuario).pipe(
            map((resp: any) => {

                // localStorage.setItem('id', resp.id);
                // localStorage.setItem('token', resp.token);
                // localStorage.setItem('usuario', JSON.stringify(resp.usuario));
                this.guardarStorage(resp.id, resp.token, resp.usuario);

                return true;
            })
        );
    }

    crearUsuario( usuario: Usuario ) {

        let url = URL_SERVICIOS;
        url += '/usuario';

        return this.http.post(url, usuario)
                .pipe(
                    map((resp: any) => {
                        swal('Usuario creado', usuario.email, 'success');
                        return resp.usuario;
                    })
                );

    }

    actualizarUsuario( usuario: Usuario ) {
        let url = URL_SERVICIOS + '/usuario/' + usuario._id;
        url += '?token=' + this.token;

        return this.http.put(url, usuario).pipe(
            map((resp: any) => {

                if (usuario._id === this.usuario._id) {
                    this.guardarStorage(resp.usuario._id, this.token, resp.usuario);
                }

                swal('Usuario actualizado', usuario.nombre, 'success');

                return true;

            })
        );
    }

    cambairImagen(file: File, id: string) {

        this.subirArchivoService.subirArchivo(file, 'usuarios', id).then((resp: any) => {
            this.usuario.img = resp.usuario.img;
            swal('Imagen Actualizada', this.usuario.nombre, 'success');
            this.guardarStorage(id, this.token, this.usuario);
        }).catch(err => {
            console.log(err);
        });

    }

    cargarUsuarios(desde = 0) {
        const url = URL_SERVICIOS + '/usuario?desde=' + desde;

        return this.http.get(url);
    }

    buscarUsuarios(termino: string) {
        const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
        return this.http.get(url).pipe(
            map((resp: any) => resp.usuarios)
        );
    }

    borrarUsuario(id: string) {
        const url = `${URL_SERVICIOS}/usuario/${id}?token=${this.token}`;

        return this.http.delete(url).pipe(
            map((resp: any) => {
                swal('Usuario eliminado exitosamente!', resp.usuario.nombre, 'success');

                return true;
            })
        );
    }
}

import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styles: []
})
export class UsuariosComponent implements OnInit {

    usuarios: Usuario[] = [];
    desde: number = 0;
    totalRegistro: number = 0;
    cargando = true;

    constructor(
        public usuarioService: UsuarioService,
        public modalUploadService: ModalUploadService
    ) { }

    ngOnInit() {
        this.cargarUsuarios();

        this.modalUploadService.notificacion.subscribe(resp => this.cargarUsuarios());
    }

    mostrarModal(usuario: Usuario) {
        this.modalUploadService.mostartModal('usuarios', usuario._id);
    }

    cargarUsuarios() {
        this.cargando = true;
        this.usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
            this.cargando = false;
            this.totalRegistro = resp.total;
            this.usuarios = resp.usuarios;

        });
    }

    cambiarDesde(valor: number) {
        const desde = this.desde + valor;
        if (desde >= this.totalRegistro) {
            return;
        }

        if (desde < 0) {
            return;
        }

        this.desde += valor;
        this.cargarUsuarios();
    }

    buscarUsuario(termino: string) {
        if (termino.length <= 0) {
            this.cargarUsuarios();
            return;
        }
        this.cargando = true;
        this.usuarioService.buscarUsuarios(termino).subscribe((usuarios: Usuario[]) => {

            this.usuarios = usuarios;
            this.cargando = false;

        });
    }

    borrandoUsuario(usuario: Usuario) {

        if (usuario._id === this.usuarioService.usuario._id) {
            swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
            return;
        }

        swal({
            title: `Eliminando usuario`,
            text: `¿Seguro que desea eliminar el usuario ${usuario.nombre}?`,
            icon: 'warning',
            buttons: true,
            dangerMode: true
        }).then(borrar => {
            if (borrar) {
                this.usuarioService.borrarUsuario(usuario._id).subscribe(resp => {

                    this.cargarUsuarios();

                });
            }
        });
        console.log(usuario);
    }

    guardarUsuario(usuario: Usuario) {
        this.usuarioService.actualizarUsuario(usuario).subscribe();
    }

}

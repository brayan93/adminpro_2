import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Medico } from '../../models/medico.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
    providedIn: 'root'
})
export class MedicoService {

    totalMedicos: number = 0;

    constructor(
        public http: HttpClient,
        public usuarioService: UsuarioService,
    ) { }

    cargarMedicos(desde = 0) {
        const url = `${URL_SERVICIOS}/medico?desde=${desde}`;
        return this.http.get(url).pipe(
            map((resp: any) => {
                this.totalMedicos = resp.total;
                return resp.medicos;
            })
        );
    }

    obtenerMedico(id: string) {
        const url = `${URL_SERVICIOS}/medico/${id}`;
        return this.http.get(url).pipe(
            map((resp: any) => {
                return resp.medico;
            })
        );
    }

    buscarMedico(termino: string) {
        const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
        return this.http.get(url).pipe(
            map((resp: any) => resp.medicos)
        );
    }

    borrandoMedico(medico: Medico) {
        const url = `${URL_SERVICIOS}/medico/${medico._id}?token=${this.usuarioService.token}`;
        return this.http.delete(url).pipe(
            map((resp: any) => {
                swal('Medico Eliminado exitosamente!', resp.medico.nombre, 'success');

                return true;
            })
        );
    }

    guardarMedico(medico: Medico) {
        if (medico._id) {
            // Actualizando
            const url = `${URL_SERVICIOS}/medico/${medico._id}?token=${this.usuarioService.token}`;
            return this.http.put(url, medico).pipe(
                map((resp: any) => {
                    console.log(resp);
                    swal('Médico Actualizado', medico.nombre, 'success');
                    return resp.medico;
                })
            );
        } else {
            // Creando
            const url = `${URL_SERVICIOS}/medico/?token=${this.usuarioService.token}`;
            return this.http.post(url, medico).pipe(
                map((resp: any) => {
                    console.log(resp);
                    swal('Médico Creado', medico.nombre, 'success');
                    return resp.medico;
                })
            );
        }
    }
}

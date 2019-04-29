import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import { Hospital } from '../../models/hospital.model';

@Injectable({
    providedIn: 'root'
})
export class HospitalService {

    totalHospitales: number = 0;

    constructor(
        public http: HttpClient,
        public usuarioService: UsuarioService,
    ) { }

    cargarHospitales(desde = 0) {
        const url = `${URL_SERVICIOS}/hospital?desde=${desde}`;

        return this.http.get(url).pipe(
            map((resp: any) => {
                this.totalHospitales = resp.total;
                return resp.hospitales;
            })
        );
    }

    obtenerHospital(id: string) {
        const url = `${URL_SERVICIOS}/hospital/${id}`;
        return this.http.get(url).pipe(
            map((resp: any) => {
                return resp.hospital;
            })
        );
    }

    buscarHospital(termino: string) {
        const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
        return this.http.get(url).pipe(
            map((resp: any) => resp.hospitales)
        );
    }

    crearHospital(hospital: Hospital) {
        const url = `${URL_SERVICIOS}/hospital?token=${this.usuarioService.token}`;

        return this.http.post(url, hospital).pipe(
            map((resp: any) => {
                swal('Hospital creado', hospital.nombre, 'success');
                return resp.usuario;
            })
        );
    }

    actualizarHospital(hospital: Hospital) {
        let url = URL_SERVICIOS + '/hospital/' + hospital._id;
        url += '?token=' + this.usuarioService.token;

        return this.http.put(url, hospital).pipe(
            map((resp: any) => {

                swal('Hospital actualizado', hospital.nombre, 'success');

                return true;

            })
        );
    }

    borrarHospital(id: string) {
        const url = `${URL_SERVICIOS}/hospital/${id}?token=${this.usuarioService.token}`;

        return this.http.delete(url).pipe(
            map((resp: any) => {
                swal('Hospital Elimando exitosamente!', resp.hospital.nombre, 'success');

                return true;
            })
        );
    }
}

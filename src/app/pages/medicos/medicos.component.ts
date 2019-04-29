import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';

declare var swal: any;

@Component({
    selector: 'app-medicos',
    templateUrl: './medicos.component.html',
    styles: []
})
export class MedicosComponent implements OnInit {

    desde: number = 0;
    medicos: Medico[] = [];
    cargando = true;
    constructor(
        public medicoService: MedicoService,
    ) { }

    ngOnInit() {
        this.cargarMedicos();
    }

    cargarMedicos() {
        this.cargando = true;
        this.medicoService.cargarMedicos(this.desde).subscribe(medicos => {
            this.medicos = medicos;
            this.cargando = false;
        });
    }

    buscarMedico(termino: string) {
        if (!termino || termino.length < 1) {
            this.cargarMedicos();
            return;
        }
        this.cargando = true;
        this.medicoService.buscarMedico(termino).subscribe(medicos => {
            this.medicos = medicos;
            this.cargando = false;
        });
    }

    cambiarDesde(valor) {
        const desde = this.desde + valor;
        if (desde >= this.medicoService.totalMedicos) {
            return;
        }

        if (desde < 0) {
            return;
        }

        this.desde += valor;
        this.cargarMedicos();
    }

    borrandoMedico(medico: Medico) {
        swal({
            title: `Eliminando medico`,
            text: `¿Seguro que desea eliminar al medico ${medico.nombre}?`,
            icon: 'warning',
            buttons: true,
            dangerMode: true
        }).then(borrar => {
            if (borrar) {
                this.medicoService.borrandoMedico(medico).subscribe(resp => {
                    if (this.desde >= this.medicoService.totalMedicos - 1) {
                        this.desde = 0;
                    }
                    this.cargarMedicos();
                });
            }
        });
    }



}

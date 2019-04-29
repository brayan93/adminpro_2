import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { MedicoService } from '../../services/medico/medico.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadComponent } from '../../components/modal-upload/modal-upload.component';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
    selector: 'app-medico',
    templateUrl: './medico.component.html',
    styles: []
})
export class MedicoComponent implements OnInit {

    hospitales: Hospital[] = [];
    medico: Medico = new Medico('', '', '', '', '');
    hospital: Hospital  = new Hospital('');

    constructor(
        public hospitalService: HospitalService,
        public usuarioService: UsuarioService,
        public medicoService: MedicoService,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public modalUploadService: ModalUploadService
    ) {
        activatedRoute.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                if (id !== 'nuevo') {
                    this.cargarMedico(id);
                }
            }
        });
    }

    ngOnInit() {
        this.hospitalService.cargarHospitales().subscribe((hospitales: any) => this.hospitales = hospitales);

        this.modalUploadService.notificacion.subscribe(resp => {
            this.medico.img = resp.medico.img;
        });
    }

    cargarMedico(id: string) {
        this.medicoService.obtenerMedico(id).subscribe(medico => {
            this.medico = medico;
            this.medico.hospital = medico.hospital._id;
            this.seleccionarHospital(this.medico.hospital);
        });
    }

    guardarMedico(f: NgForm) {

        if (f.invalid) {
            return;
        }

        this.medicoService.guardarMedico(this.medico).subscribe((medico: any) => {
            console.log(medico);
            this.medico._id = medico._id;
            this.router.navigate(['/medico', medico._id]);
        });

    }

    seleccionarHospital(id: string) {
        if (!id || id.length < 1) {
            this.hospital = null;
            return;
        }

        this.hospitalService.obtenerHospital(id).subscribe((hospital: any) => this.hospital = hospital);
    }

    cambiarFoto() {
        this.modalUploadService.mostartModal('medicos', this.medico._id);
    }

}

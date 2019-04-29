import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    HospitalService,
    MedicoService
} from './service.index';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        SettingsService,
        SharedService,
        SidebarService,
        UsuarioService,
        LoginGuardGuard,
        SubirArchivoService,
        ModalUploadService,
        HospitalService,
        MedicoService
    ],
    declarations: []
})
export class ServiceModule { }

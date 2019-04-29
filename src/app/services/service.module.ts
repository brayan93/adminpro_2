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
    MedicoService,
    AdminGuard
} from './service.index';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        AdminGuard,
        LoginGuardGuard,
        UsuarioService,
        HospitalService,
        MedicoService,
        SubirArchivoService,
        ModalUploadService,
        SettingsService,
        SharedService,
        SidebarService,
    ],
    declarations: []
})
export class ServiceModule { }

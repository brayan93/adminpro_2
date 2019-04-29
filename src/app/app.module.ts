import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Rutas
import { APP_ROUTES } from './app.routes';

// Componenetes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';

// Modulos
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { ComponentsModule } from './components/components.module';

// Servicios
import { ServiceModule } from './services/service.module';
import { ModalUploadComponent } from './components/modal-upload/modal-upload.component';
@NgModule({
    declarations: [
        PagesComponent,
        AppComponent,
        LoginComponent,
        RegisterComponent,
        NopagefoundComponent,
    ],
    imports: [
        APP_ROUTES,
        ServiceModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        BrowserModule,
        ComponentsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

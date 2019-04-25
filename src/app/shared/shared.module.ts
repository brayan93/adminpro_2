import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

// Componentes
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    declarations: [
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent,
    ],
    exports: [
        BreadcrumbsComponent,
        HeaderComponent,
        SidebarComponent
    ],
    imports: [
        RouterModule,
        BrowserModule,
        CommonModule,
        PipesModule
    ]
})
export class SharedModule { }

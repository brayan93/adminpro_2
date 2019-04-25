import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Pipes
import { PipesModule } from '../pipes/pipes.module';

// Plugins
import { ChartsModule } from 'ng2-charts';

// Componentes
import { GraficoDonaComponent } from './grafico-dona/grafico-dona.component';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { ModalUploadComponent } from './modal-upload/modal-upload.component';

@NgModule({
    declarations: [
        IncrementadorComponent,
        GraficoDonaComponent,
        ModalUploadComponent
    ],
    exports: [
        IncrementadorComponent,
        GraficoDonaComponent,
        ModalUploadComponent
    ],
    imports: [
        FormsModule,
        ChartsModule,
        CommonModule,
        PipesModule
    ]
})
export class ComponentsModule { }

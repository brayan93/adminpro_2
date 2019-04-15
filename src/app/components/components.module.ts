import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Plugins
import { ChartsModule } from 'ng2-charts';

// Componentes
import { GraficoDonaComponent } from './grafico-dona/grafico-dona.component';
import { IncrementadorComponent } from './incrementador/incrementador.component';

@NgModule({
    declarations: [
        IncrementadorComponent,
        GraficoDonaComponent
    ],
    exports: [
        IncrementadorComponent,
        GraficoDonaComponent
    ],
    imports: [
        FormsModule,
        ChartsModule
    ]
})
export class ComponentsModule { }

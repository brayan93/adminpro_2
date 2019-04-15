import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
    @ViewChild('txtProgress') txtProgress: ElementRef;

    @Input('nombre') leyenda: string = 'leyenda';
    @Input() progreso: number = 50;

    @Output() cambioValor: EventEmitter<number> = new EventEmitter();
    constructor() {
    }

    ngOnInit() {
    }

    onChange(newValue: number) {
        if (newValue >= 0 && newValue <= 100) {
            console.log(newValue);
            this.progreso = newValue;
        } else {
            if (newValue < 0) {
                this.progreso = 0;
            } else if (newValue > 100) {
                this.progreso = 100;
            }
        }
        this.txtProgress.nativeElement.value = this.progreso;

        this.cambioValor.emit(this.progreso);

    }

    cambairValor(valor) {
        if (this.progreso + valor < 0  || this.progreso + valor > 100) {
            return;
        }

        this.progreso = this.progreso + valor;

        this.txtProgress.nativeElement.focus();

        this.cambioValor.emit(this.progreso);
    }

}

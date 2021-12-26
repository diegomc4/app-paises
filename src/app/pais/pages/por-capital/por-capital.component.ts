import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: ['./por-capital.component.css'],
})
export class PorCapitalComponent {
  termino: string = '';
  isError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) {}

  buscar(termino: string) {
    this.isError = false;
    this.termino = termino;

    this.paisService.buscarCapital(termino).subscribe({
      next: (paises) => {
        console.log('DATA DE PAISES::', paises);
        this.paises = paises;
        console.log('nombre: ', paises[0].name);
        console.log('bandera : ', paises[0].flag);
        console.log('poblacion : ', paises[0].population);

        //paises[0].languages[0].
      },
      error: (err) => {
        this.isError = true;
        this.paises = [];
      },
    });

    console.log(this.isError);
  }
}

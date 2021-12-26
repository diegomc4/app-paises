import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css'],
})
export class PorPaisComponent implements OnInit {
  termino: string = '';
  isError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) {}

  ngOnInit(): void {}

  buscar(termino: string) {
    this.mostrarSugerencias = false;
    this.isError = false;
    this.termino = termino; // el this.termino es = al termino que recibo por argumento // se lo establezco a la propiedad de la clase
    console.log(this.termino);
    this.paisService.buscarPais(this.termino).subscribe({
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

  sugerencias(termino: string) {
    this.isError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    this.paisService.buscarPais(termino).subscribe({
      next: (paises) => {
        this.paisesSugeridos = paises.splice(0, 5);
      },
      error: (err) => {
        this.paisesSugeridos = [];
      },
    });
  }

  buscarSugerido(termino: string) {
    this.buscar(termino);
  }
}

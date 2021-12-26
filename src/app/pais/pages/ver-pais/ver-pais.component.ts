import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.css'],
})
export class VerPaisComponent implements OnInit {
  pais!: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paiseService: PaisService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.paiseService.getPaisPorAlpha(id)),
        tap(console.log)
      )
      .subscribe((pais) => {
        this.pais = pais;
        console.log(pais);
      });

    /*  this.activatedRoute.params.subscribe(({ id }) => {// esta forma un observable depende de otro que le devuelva el id y poder sacar el pais en base al id
      console.log(id);
      this.paiseService.getPaisPorAlpha(id).subscribe((pais) => {
        console.log(pais);
      });
    }); */
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private apiUrl = 'https://restcountries.com/v2';

  get httpParams() {
    return new HttpParams().set(
      'fields',
      'name,capital,alpha2Code,flag,population'
    );
  }

  constructor(private http: HttpClient) {}

  buscarPais(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${termino}`;
    console.log('busqueda', url);
    //return this.http.get(url).pipe(catchError((err) => of(['diego'])));

    //return this.http.get<Country[]>(url);
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  buscarCapital(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${termino}`;
    console.log('busqueda', url);
    return this.http.get<Country[]>(url);
  }
  getPaisPorAlpha(id: string): Observable<Country> {
    const url = `${this.apiUrl}/alpha/${id}`;
    console.log('busqueda', url);
    return this.http.get<Country>(url);
  }

  buscarRegion(termino: string): Observable<Country[]> {
    const params = new HttpParams().set(
      'fields',
      'name,capital,alpha2Code,flag,population'
    );

    const url = `${this.apiUrl}/region/${termino}`;

    //console.log('busqueda', url);
    return this.http
      .get<Country[]>(url, { params: params })
      .pipe(tap(console.log));
  }
}

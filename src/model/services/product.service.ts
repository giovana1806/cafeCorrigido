import { Injectable } from '@angular/core';
import { localProducts } from '../data/mock-products';
import { Iproducts } from './iproducts';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/product'; 

  products:Iproducts[] = localProducts;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Iproducts[]> {
    return this.http.get<Iproducts[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Erro ao buscar produtos da API, usando produtos locais:', error);
        return of(this.products);
      })
    )
  }
}

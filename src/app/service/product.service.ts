import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  storage = window.localStorage;
  apiUrl = 'http://localhost:4200/assets/data.json';

  constructor(private http: HttpClient) {}

  public productListInCart: Product[] = [];

  public getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/data.json');
  }
  getaProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  addaProduct(product: Product[]): void {
    this.storage.setItem('products', JSON.stringify(product));
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.http
      .get<Product[]>('assets/data.json')
      .pipe(map((products) => products.find((product) => product.id == id)));
  }
}


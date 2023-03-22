import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public productListInCart: Product[] = [];
  storage = window.localStorage;

  constructor() {}
  getProductsInCart() {
    const getProduct = this.storage.getItem('products');
    return getProduct ? JSON.parse(getProduct) : [];
   }

  clearCart(): void {
    this.storage.clear();
  }
  addToCart(quantity: number, product: Product) {
    //const productListInCart: Product[] = this.getProductsInCart();
    const existingProduct = this.productListInCart.filter(
      (p) => { return p.id == product.id }
    );
    if (existingProduct.length > 0 ) {
        const newQuantity =
        existingProduct[0].quantity! + parseInt(quantity as unknown as string);

        existingProduct[0]['quantity'] = newQuantity;

      return this.productListInCart;

    } else {
      const quantityToInt = parseInt(quantity as unknown as string);
      product['quantity'] = quantityToInt;
      this.productListInCart.push(product);
      return this.productListInCart;
    }
  }
}

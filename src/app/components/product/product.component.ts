import { Component, Input, OnInit } from '@angular/core';
//import { MessageService } from 'primeng/api';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() productItem!: Product;
  public ItemCounts: number[] = [1,2,3,4,5];
  selectedItem = 0;

 
  constructor(
    private productService: ProductService,
    private cartService: CartService) 
      {}

  ngOnInit(): void {}

  selectedChange(value: any) {
    this.selectedItem = value;
  }

  addProductToCart(product: Product): void {
    const cartProducts: Product[] = this.cartService.getProductsInCart();
    let productInCart = cartProducts.find((prod) => 
    prod.id == product.id);
    if (productInCart) {
      productInCart.quantity = this.selectedItem;
      productInCart ? this.productService.addaProduct(cartProducts) : null;
    } else {
      cartProducts.push(Object.assign(product, { amount: this.selectedItem }));
      this.productService.addaProduct(cartProducts);
      const message = `${product.name} has been added to your cart.`;
      alert(message);
    }
  }

  

}

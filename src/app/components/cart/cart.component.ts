import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Router } from '@angular/router';
import { Checkout } from 'src/app/model/checkout';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @Output() userInfo = new EventEmitter();
  @Output() onRemoveCartItem: EventEmitter<Product> = new EventEmitter();

  
  products: Product[] = [];
  checkout: Checkout = new Checkout()
  total: number = 0;
  productCounts : number[] = [1,2,3,4,5];
  selectedItem = 0;
  name: string = '';
  location: string = '';
  path: string = '';
  creditCardNumber: string = '';

  constructor(private cartService: CartService, private route: Router) {}

  ngOnInit(): void {
    this.products = this.cartService.getProductsInCart();
   this.total =  this.getCartAmount(this.products)
   //this.calculateTotal()
   this.checkout = this.checkout;
  
  }

  getCartAmount(products: Product[] ): number{
    return products.reduce((value, current) => {
       const currentAmount =
       current.price 
       let  total: number = value + currentAmount;
       return total;
     }, 0);
   }

   calculateTotal() {
    this.total = this.products.reduce((acc, item) => {
      this.total = parseFloat(
        (acc + item.price * item.quantity).toFixed(2)
      );
      return this.total;
    }, 0);
  }

   selectChange(value: number, product: Product) {
    this.products = this.changeInCart(value, product);
  const index = this.products.indexOf(product);
 this.total =  this.getCartAmount(this.products)
  this.products[index] = product;
  this.products[index].quantity = value;
 // this.calculateTotal()
};


changeInCart(quantity: number, product: Product) {
  this.products = this.products.map((prodect) => {
    if (prodect.id == product.id) {
      prodect['quantity'] = quantity;
    }
    return prodect;
  });
  return this.products;
}

// onSubmit(value: any) {
//   this.cartService.clearCart();
//   this.route.navigate([`success/${value.firstName}/${this.total}`]);
// }

submitForm = () => {
  const Checkout = {
    name: this.name,
    location: this.location,
    creditCardNumber: this.creditCardNumber,
    total: this.total,
    path: this.path
  };
  this.addConfirmation(Checkout);
  this.name = '';
  this.location = '';
  this.creditCardNumber = '';
  this.total = 0;
  this.cartService.clearCart();
  this.path = '/confirmation'
  this.route.navigateByUrl(this.path);
};

addConfirmation(confirmedPaymentInfo: Checkout) {
  this.checkout = confirmedPaymentInfo;
  return this.checkout;
}


}

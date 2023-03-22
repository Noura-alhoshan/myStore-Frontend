import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { takeUntil } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();
  product!: Product;
  products!: Product[];
  quantity: number = 1;
  id!: number;
  ItemCounts: number[] = [1,2,3,4,5];
  selectedItem = 0
 

  constructor(
    private productsService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let name = this.route.snapshot.params['productName'];
    this.cartService.productListInCart.filter((Name) => 
    Name.name === name);
    const promise = this.productsService
      .getAllProducts()
      .pipe(
        map((products) => products.filter((item) => item.name === name))
      )
      .toPromise();
    promise.then((data) => (this.product = data![0]));
  }

  selectedChange(value: any) {
    this.selectedItem = value;
  }
  
  addProductToCart(product: Product): void {
    const cartProducts: Product[] = this.cartService.getProductsInCart();
    let productInCart = cartProducts.find((ele) => ele.id === product.id);
    if (productInCart) {
      productInCart.quantity = this.selectedItem;
      productInCart ? this.productsService.addaProduct(cartProducts) : null;
    } else {
      cartProducts.push(Object.assign(product, { amount: this.selectedItem }));
      this.productsService.addaProduct(cartProducts);
      const message = `${product.name} has been added to your cart.`;
      alert(message);
    }
    this.router.navigate(['/cart']);
  }
}

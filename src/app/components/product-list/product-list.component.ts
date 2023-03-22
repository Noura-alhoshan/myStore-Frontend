import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})

export class ProductListComponent implements OnInit {
  products: Product[] = [];
  private ngUnsubscribe = new Subject<void>();

  constructor(private productsService: ProductService) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().pipe(takeUntil(this.ngUnsubscribe))
    .subscribe({
      next: (res) => {
        this.products = res;
      },
    // .subscribe((index) => {
    //   this.products = index;
    });
  }
}

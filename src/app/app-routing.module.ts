import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailComponent } from './components/product-details/product-details.component';
 import { ProductListComponent } from './components/product-list/product-list.component';
 import { ConfirmationComponent } from './components/confirmation/confirmation.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/:productName', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
   { path: 'confirmation', component: ConfirmationComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

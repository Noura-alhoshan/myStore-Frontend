import { Component } from '@angular/core';
import { Checkout } from 'src/app/model/checkout';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  checkout: Checkout = new Checkout()

  ngOnInit(): void {
    this.checkout = this.getConfirmation();
   }
  getConfirmation() {
    return this.checkout;
  }

  // addConfirmation(confirmedPaymentInfo: Checkout) {
  //   this.checkout = confirmedPaymentInfo;
  //   return this.checkout;
 // }
}

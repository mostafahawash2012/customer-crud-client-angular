import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerServiceService } from '../customer-service.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  error = null;
  id: number;
  customer: Customer;
  constructor(private route: ActivatedRoute,private router: Router,
    private customerService: CustomerServiceService ) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.customer = new Customer();
    this.customerService.getCustomer(this.id)
    .subscribe(data => {
      console.log(data)
      this.customer = data;
    },
    error => console.log(error));
  }

  updateCustomer(){
    this.customerService.updateCustomer(this.customer)
    .subscribe(data => console.log(data), error => this.error = error);
    this.customer = new Customer();
    this.goToCustomerList();
}
  onSubmit(){
    this.updateCustomer();
  }
  goToCustomerList(){
    this.router.navigate(['/']);
  }

}

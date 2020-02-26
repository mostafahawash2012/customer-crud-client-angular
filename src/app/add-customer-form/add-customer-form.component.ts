import { Component, OnInit, Input } from '@angular/core';
import { CustomerServiceService } from '../customer-service.service';
import { Customer } from '../models/customer';
import { ActivatedRoute, Router } from '@angular/router';
import { WebSocketServiceService } from '../web-socket-service.service';
import {CommunicationService} from '../communication.service'
@Component({
  selector: 'app-add-customer-form',
  templateUrl: './add-customer-form.component.html',
  styleUrls: ['./add-customer-form.component.css']
})
export class AddCustomerFormComponent implements OnInit {

  
  customer:Customer;
  constructor(public comService: CommunicationService,private socketService : WebSocketServiceService,private router:Router, private customerService: CustomerServiceService) { 
    this.customer = new Customer();
    
  }

  onSubmit(){
    console.log("onSubmit()",this.customer.firstName);
    this.customerService.saveCustomer(this.customer).subscribe(data => console.log(data));
    //this.socketService.send("send app/customers");
  //  this.comService.communicateWithParent("comm service notify");
    this.goToCustomerList();
    
  }

  goToCustomerList(){

    console.log('goToCustomerList');
    this.router.navigate(['']);
  }
  ngOnInit() {
  }

}

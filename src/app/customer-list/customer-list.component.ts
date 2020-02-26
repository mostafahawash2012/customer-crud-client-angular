import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { CustomerServiceService } from '../customer-service.service';
import { Router } from '@angular/router';
import { WebSocketServiceService } from '../web-socket-service.service';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  error = null;
  stompClient: any;
  topic: string = "/topic/customers";
  customers: Customer[];

  constructor(public comService: CommunicationService, private webSocketService: WebSocketServiceService,
    private customerService: CustomerServiceService, private router: Router) {
    this.customers = [];
    //this.reloadData();
    webSocketService.connect();
    webSocketService.subject.subscribe(
      sdkEvent => {
        //console.log( "got message using subject"+ sdkEvent);
        this.onMessageReceived(sdkEvent);
      }
    )
  }

  onMessageReceived(message) {
    console.log("Message Recieved from Server :: " + message);
    console.log('operation ' + JSON.parse(message.body).operation)
    console.log('data ' + JSON.parse(message.body).data.id)
    let operation = JSON.parse(message.body).operation;
    let customer: Customer = JSON.parse(message.body).data;
    if (operation === "POST") {
      console.log("A new customer was added ")
      this.customers.push(customer);

    } else if (operation === "DELETE") {
      console.log("A new customer was deleted ")
      let id : number = customer.id;
      this.customers = this.customers.filter(customer => customer.id !== id);
      console.log("customers list  filter" + this.customers)
    }
    else if(operation == "PUT"){
      let id : number = customer.id;

      const index: number = this.customers.findIndex(c => c.id === id);
      console.log("customer id to be updated " + index);
      this.customers[index] = customer;
    }
    //this.customers.push(JSON.parse(message.body));
    // this.reloadData()
  }
  addCustomer() {
    console.log("adding customer. ");
    this.router.navigate(['addCustomer'])
    //this.webSocketService.send("ss");
  }

  ngOnInit() {
    console.log("reloadDate");
    this.reloadData();
    // this.comService.subject.subscribe(
    //   message => console.log(message)
    // )
    // this.comService.subject.subscribe(
    //   message => this.webSocketService.send("ss")
    // )
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id)
      .subscribe(
        data => {
          console.log(data),
          error => this.error = error
       //   this.reloadData();
        }
      )
   // this.reloadData();
  }

  reloadData() {
    this.customerService.getCustomers()
      .subscribe(
        data => { 
          this.customers = data;
          console.log("reloadDate");
        },
        error => {
          console.log(error);
          this.error = error
        }

      );

  }
  updateCustomer(id: number) {
    this.router.navigate(['updateCustomer', id]);
  }

}

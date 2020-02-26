import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AddCustomerFormComponent } from './add-customer-form/add-customer-form.component';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';



const routes: Routes = [
  {path:'' , component: CustomerListComponent},
  {path:'addCustomer' , component: AddCustomerFormComponent},
  {path: 'updateCustomer/:id', component: UpdateCustomerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }

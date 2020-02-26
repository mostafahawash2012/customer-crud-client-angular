import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddCustomerFormComponent } from './add-customer-form/add-customer-form.component';
import {FormsModule} from '@angular/forms';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { MyErrorHandler } from './my-error-handler';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    AddCustomerFormComponent,
    UpdateCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: ErrorHandler, useClass: MyErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

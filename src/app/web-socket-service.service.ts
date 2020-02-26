import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class WebSocketServiceService {

  public subject = new Subject<any>();
  topic: string = "/topic/customers";
  stompClient: any;
  constructor() { }
  // public getService(): WebSocketServiceService{
  //   return this;
  // }

   // Open connection with the back-end socket
   public connect() {
    console.log("Initialize WebSocket Connection");
    let socket = new SockJS(`http://localhost:8080/ws`);

    this.stompClient = Stomp.over(socket);
    console.log("socket connection .. ");
    this.stompClient.connect({}, frame=>{
      this.stompClient.subscribe(this.topic,sdkEvent=>{
        this.communicateWithComponent(sdkEvent);
          
      });
    });
    
    return this.stompClient;
  }

  public disconnect(){
    this.stompClient.disconnect();
  }
  communicateWithComponent(sdkEvent){
    console.log('communicate with parent')
           this.subject.next(sdkEvent);
  }
  // send(message) {
  //   console.log("calling /app/customers via web socket");
  //   this.stompClient.send("/app/customers", {}, JSON.stringify(message));
  // }
}

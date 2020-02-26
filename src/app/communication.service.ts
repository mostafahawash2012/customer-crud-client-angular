import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  public subject = new Subject<any>();

  constructor() { }


  communicateWithParent(message){
    console.log('communicate with parent')
     this.subject.next(message);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  log(assigmentName, action){
    console.log(`Assignment ${assigmentName} ${action}`);
  }

}

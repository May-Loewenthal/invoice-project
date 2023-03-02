import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  public log(message: string) {
    // here I want to log the messages to the server
  }
}

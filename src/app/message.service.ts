import { Injectable } from '@angular/core';

<<<<<<< HEAD
@Injectable({ providedIn: 'root' })
export class MessageService {
=======
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  
>>>>>>> f37d1c4c7fbff73875b18fc8366cbf5f478464a6
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
<<<<<<< HEAD

=======
>>>>>>> f37d1c4c7fbff73875b18fc8366cbf5f478464a6

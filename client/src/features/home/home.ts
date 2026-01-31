import { Component, Input, signal } from '@angular/core';
import { Register } from '../account/register/register';
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected registerMode = signal(false);

  showRegister() {
    this.registerMode.set(true);
  }

  cancelRegister(event: boolean): void {
    this.registerMode.set(event);
  }
}

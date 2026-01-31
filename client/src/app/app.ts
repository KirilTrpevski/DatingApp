import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Nav } from '../layout/nav/nav';
import { AccountService } from '../core/services/account-service';
import { Home } from '../features/home/home';
import { User } from '../shared/models/User';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private httpClient = inject(HttpClient);
  private accountService = inject(AccountService);
  protected members = signal<User[] | null>(null);

  async getMembers() {
    try {
      return lastValueFrom(
        this.httpClient.get<User[]>('https://localhost:5001/api/members'),
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  setCurrentUser() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.accountService.currentUser.set(user);
    }
  }

  async ngOnInit() {
    this.setCurrentUser();
    this.members.set(await this.getMembers());
  }
}

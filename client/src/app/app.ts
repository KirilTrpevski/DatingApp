import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private httpClient = inject(HttpClient);

  members = toSignal(
    this.httpClient.get<any[]>('https://localhost:5001/api/members'),
    {
      initialValue: [],
    }
  );

  ngOnInit(): void {}
}

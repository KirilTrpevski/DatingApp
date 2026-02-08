import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  imports: [],
  templateUrl: './test-errors.html',
  styleUrl: './test-errors.css',
})
export class TestErrors {
  private httpClient = inject(HttpClient);
  baseUrl = 'https://localhost:5001/api/';
  validationErrors = signal<string[]>([]);

  get404Error() {
    this.httpClient.get(this.baseUrl + 'buggy/not-found').subscribe({
      next: (resonse) => console.log(resonse),
      error: (error) => console.log(error),
    });
  }

  get400Error() {
    this.httpClient.get(this.baseUrl + 'buggy/bad-request').subscribe({
      next: (resonse) => console.log(resonse),
      error: (error) => console.log(error),
    });
  }

  get500Error() {
    this.httpClient.get(this.baseUrl + 'buggy/server-error').subscribe({
      next: (resonse) => console.log(resonse),
      error: (error) => console.log(error),
    });
  }

  get401Error() {
    this.httpClient.get(this.baseUrl + 'buggy/auth').subscribe({
      next: (resonse) => console.log(resonse),
      error: (error) => console.log(error),
    });
  }

  get400ValidationError() {
    this.httpClient.post(this.baseUrl + 'account/register', {}).subscribe({
      next: (resonse) => console.log(resonse),
      error: (error) => {
        console.log(error);
        this.validationErrors.set(error);
      },
    });
  }
}

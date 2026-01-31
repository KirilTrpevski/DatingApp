import { Component, inject, signal } from '@angular/core';
import { form, required, FormField, email } from '@angular/forms/signals';
import { AccountService } from '../../core/services/account-service';
import { UserLoginModel } from '../../shared/models/User';

@Component({
  selector: 'app-nav',
  imports: [FormField],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService);

  loginModel = signal<UserLoginModel>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Email is not valid' });
    required(schemaPath.password, { message: 'Password is required' });
  });

  submitLogin($event: any) {
    $event.preventDefault();
    const credentials = this.loginModel();

    this.accountService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login successful', response);
      },
      error: (error) => {
        console.error('Login failed', error);
      },
    });
  }

  logout() {
    this.accountService.logout();
    this.resetForm();
  }

  private resetForm() {
    this.loginModel.set({ email: '', password: '' });
    this.loginForm().reset();
  }
}

import { Component, inject, signal } from '@angular/core';
import { form, required, FormField, email } from '@angular/forms/signals';
import { AccountService } from '../../core/services/account-service';
import { UserLoginModel } from '../../shared/models/User';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormField, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService);
  protected router = inject(Router);
  private toastService = inject(ToastService);

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
      next: () => {
        this.router.navigateByUrl('/members');
        this.toastService.success('Logged in successfully');
      },
      error: (error) => {
        console.log(error);
        this.toastService.error(error.error);
      },
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/home');
    this.resetForm();
  }

  private resetForm() {
    this.loginModel.set({ email: '', password: '' });
    this.loginForm().reset();
  }
}

import {
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { User, UserRegisterModel } from '../../../shared/models/User';
import {
  email,
  form,
  FormField,
  minLength,
  required,
} from '@angular/forms/signals';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormField],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  protected accountService = inject(AccountService);
  registerModel = signal<UserRegisterModel>({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  cancelRegister = output<boolean>();

  registerForm = form(this.registerModel, (schemaPath) => {
    required(schemaPath.displayName, { message: 'Display Name is required' });
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Email is not valid' });
    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.password, 6, {
      message: 'Password must be at least 6 characters long',
    });
    required(schemaPath.confirmPassword, {
      message: 'Confirm Password is required',
    });
  });

  passwordMismatch = computed(() => {
    const { password, confirmPassword } = this.registerModel();
    return !!confirmPassword && password !== confirmPassword;
  });

  register($event: any) {
    $event.preventDefault();
    const newUser = this.registerModel();

    console.log('Registering user:', newUser);
    this.accountService.register(newUser).subscribe({
      next: () => {
        console.log('User registeres successfuly');
        this.cancel();
      },
      error: () => {
        console.log('Error occured');
      },
    });
    // Implementation for registering the user
  }

  cancel() {
    // Implementation for canceling registration
    this.cancelRegister.emit(false);
  }
}

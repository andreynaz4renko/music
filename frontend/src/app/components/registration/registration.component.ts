import { Component } from '@angular/core';
import { InputComponent } from '../../shared/ui/input/input.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import {
  FormBuilder,
  FormControl,
  FormGroup, FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { User } from '../../_models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [InputComponent, ButtonComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  public form: FormGroup;

  get username() { return this.form.get('username') as FormControl; }
  get email() { return this.form.get('email') as FormControl; }
  get password() { return this.form.get('password') as FormControl; }


  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    });

  }

  public Submit(): void {
    this.authenticationService.register(this.username.value, this.email.value, this.password.value)
      .subscribe({
        next: (user: User) => {
          if (user && user.user.token) {
            this.router.navigate(['/home']);
          }
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });

  }
}


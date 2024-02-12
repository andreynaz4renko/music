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
import { Router, RouterModule } from '@angular/router';
import { SpinnerService } from '../../_services/spinner.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, ButtonComponent, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public form: FormGroup;

  get email() { return this.form.get('email') as FormControl; }
  get password() { return this.form.get('password') as FormControl; }


  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private spinner: SpinnerService
  ) {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    });

  }

  public Submit(): void {
    this.spinner.show();
    this.authenticationService.authorize(this.email.value, this.password.value)
      .subscribe({
        next: (user: User) => {
          if (user && user.user.token) {
            this.router.navigate(['/home']);
          }
          this.spinner.hide();
        },
        error: (e) => {
          console.error(e);
          this.spinner.hide();
        }
      });

  }
}

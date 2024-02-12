import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../../../_services/authentication.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() public customclassName: string = '';

  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

  public logout(): void {
    this.authenticationService.logout();
  }

}


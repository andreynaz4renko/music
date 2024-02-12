import { Component } from '@angular/core';
import { RecomendationComponent } from '../recomendation/recomendation.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecomendationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

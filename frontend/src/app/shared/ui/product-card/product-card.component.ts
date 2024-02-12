import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  @Input() imgSrc: string = '';

  @Input() title: string = '';

  @Input() rating: number = 0;

  @Input() actualPrice: number = 0;

  @Input() standardPrice: number = 0;

  constructor() {}

  ngOnInit() {}
}

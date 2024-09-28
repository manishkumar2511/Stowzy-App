import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-main-banner',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './main-banner.component.html',
  styleUrl: './main-banner.component.css',
})
export class MainBannerComponent {}

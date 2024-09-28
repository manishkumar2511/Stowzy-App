import { Component } from '@angular/core';
import { NavComponent } from '../../../_common/nav/nav.component';
import { MainBannerComponent } from '../../../_main/main-banner/main-banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavComponent,MainBannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
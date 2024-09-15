import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './_common/nav/nav.component';
import { MainComponent } from './_main/main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'user-gateway-UI';
  httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.httpClient.post('https://localhost:5001/api/GuestUser/hii', {}).subscribe({
      next: (response) => {
        console.log('next', response);
      },
      error: (error) => {
        console.log('err', error);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}

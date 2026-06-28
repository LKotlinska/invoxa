import { Component, inject, signal, effect, OnInit } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-header',
  imports: [MatDividerModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly router = inject(Router);
  currentUrl = signal('');
  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          event.url = '/dashboard';
        }
        // Navigation completed
        console.log('Navigation completed:', event.url);
        this.currentUrl.set(event.url.replace('/', ''));
      }
    });
  }
}

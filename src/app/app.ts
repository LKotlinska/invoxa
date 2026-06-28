import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNav } from './shared/side-nav/side-nav';
import { Header } from './shared/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideNav, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('invoxa');
}

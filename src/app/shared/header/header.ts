import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatDividerModule, MatButtonModule, MatIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  pageName = input<string>();
  btnLabel = input<string>();
  link = input<string>();
  target = input<string>('_self');
  matIcon = input<string | undefined>(undefined);
}

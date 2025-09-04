import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./components/layout/navbar/navbar";
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Navbar, NgxChartsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('crm-ui');
}

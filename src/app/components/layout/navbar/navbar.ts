import { Component } from '@angular/core';
import { Auth } from '../../../services/auth';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  constructor(public authService: Auth) { }

  logout(): void {
    this.authService.logout();
  }
}
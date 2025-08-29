import { Component, OnInit } from '@angular/core';
import { Api, DealDto } from '../../../services/api';
import { Auth } from '../../../services/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-deal-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './deal-list.html',
  styleUrls: ['./deal-list.css']
})
export class DealList implements OnInit {
  deals: DealDto[] = [];

  constructor(
    private apiService: Api,
    private authService: Auth // Inject AuthService
  ) {}

  ngOnInit(): void {
    this.loadDeals();
  }

  loadDeals(): void {
    this.apiService.getDeals().subscribe({
      next: (data) => {
        this.deals = data;
      },
      error: (err) => {
        // This could happen if the token is invalid or expired
        console.error('Error loading deals:', err);
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
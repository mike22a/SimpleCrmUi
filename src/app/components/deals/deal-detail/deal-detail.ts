import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Import Router
import { Api, DealDto } from '../../../services/api';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-deal-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './deal-detail.html',
  styleUrls: ['./deal-detail.css']
})
export class DealDetail implements OnInit {
  deal: DealDto | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Inject Router
    private apiService: Api,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.apiService.getDealById(id).subscribe({
          next: (data) => {
            this.deal = data;
          },
          error: (err) => {
            console.error('Error fetching deal details:', err);
            this.toastr.error('Could not load deal details.');
          }
        });
      }
    });
  }

  // Add this new method
  deleteDeal(): void {
    if (!this.deal) return;

    // Use a simple browser confirm dialog
    const confirmation = confirm(`Are you sure you want to delete ${this.deal.title}?`);
    
    if (confirmation) {
      this.apiService.deleteDeal(this.deal.id).subscribe({
        next: () => {
          this.toastr.success('Deal deleted successfully!');
          this.router.navigate(['/deals']);
        },
        error: (err) => this.toastr.error('Failed to delete deal.')
      });
    }
  }
}
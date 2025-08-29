import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Import Router
import { Api, ContactDto } from '../../../services/api';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact-detail.html',
  styleUrls: ['./contact-detail.css']
})
export class ContactDetail implements OnInit {
  contact: ContactDto | null = null;

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
        this.apiService.getContactById(id).subscribe({
          next: (data) => {
            this.contact = data;
          },
          error: (err) => {
            console.error('Error fetching contact details:', err);
            this.toastr.error('Could not load contact details.');
          }
        });
      }
    });
  }

  // Add this new method
  deleteContact(): void {
    if (!this.contact) return;

    // Use a simple browser confirm dialog
    const confirmation = confirm(`Are you sure you want to delete ${this.contact.firstName} ${this.contact.lastName}?`);
    
    if (confirmation) {
      this.apiService.deleteContact(this.contact.id).subscribe({
        next: () => {
          this.toastr.success('Contact deleted successfully!');
          this.router.navigate(['/contacts']);
        },
        error: (err) => this.toastr.error('Failed to delete contact.')
      });
    }
  }
}
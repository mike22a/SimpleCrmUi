import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api, CompanyDto } from '../../../services/api';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './company-detail.html',
  styleUrls: ['./company-detail.css']
})
export class CompanyDetail implements OnInit {
  company: CompanyDto | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: Api,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.apiService.getCompanyById(id).subscribe(data => {
          this.company = data;
        });
      }
    });
  }

  deleteCompany(): void {
    if (!this.company) return;

    if (confirm(`Are you sure you want to delete ${this.company.name}?`)) {
      this.apiService.deleteCompany(this.company.id).subscribe({
        next: () => {
          this.toastr.success('Company deleted successfully!');
          this.router.navigate(['/companies']);
        },
        error: () => this.toastr.error('Failed to delete company.')
      });
    }
  }
}
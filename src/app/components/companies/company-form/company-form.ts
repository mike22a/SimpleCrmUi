import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Api } from '../../../services/api';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './company-form.html',
  styleUrls: ['./company-form.css']
})
export class CompanyForm implements OnInit {
  companyForm: FormGroup;
  isEditMode = false;
  companyId: string | null = null;
  pageTitle = 'Create New Company';

  constructor(
    private fb: FormBuilder,
    private apiService: Api,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      industry: [''],
      website: ['']
    });
  }

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id');
    if (this.companyId) {
      this.isEditMode = true;
      this.pageTitle = 'Edit Company';
      this.apiService.getCompanyById(this.companyId).subscribe(company => {
        this.companyForm.patchValue(company);
      });
    }
  }

  onSubmit(): void {
    if (this.companyForm.invalid) {
      return;
    }

    if (this.isEditMode && this.companyId) {
      const updateCommand = { id: this.companyId, ...this.companyForm.value };
      this.apiService.updateCompany(updateCommand).subscribe({
        next: () => {
          this.toastr.success('Company updated successfully!');
          this.router.navigate(['/companies', this.companyId]);
        },
        error: () => this.toastr.error('Failed to update company.')
      });
    } else {
      this.apiService.createCompany(this.companyForm.value).subscribe({
        next: () => {
          this.toastr.success('Company created successfully!');
          this.router.navigate(['/companies']);
        },
        error: () => this.toastr.error('Failed to create company.')
      });
    }
  }
}
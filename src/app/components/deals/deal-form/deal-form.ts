import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Api, ContactDto } from '../../../services/api';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-deal-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './deal-form.html',
  styleUrls: ['./deal-form.css']
})
export class DealForm implements OnInit {
  dealForm: FormGroup;
  isEditMode = false;
  dealId: string | null = null;
  pageTitle = 'Create New Deal';
  contacts$: Observable<ContactDto[]>;
  dealStages$: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private apiService: Api,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.dealForm = this.fb.group({
      title: ['', Validators.required],
      value: [0, [Validators.required, Validators.min(0)]],
      stage: ['Prospecting', Validators.required],
      closeDate: ['', Validators.required],
      contactId: ['', Validators.required]
    });
    
    this.contacts$ = this.apiService.getContacts();
    this.dealStages$ = this.apiService.getDealStages();
  }

  ngOnInit(): void {
    this.dealId = this.route.snapshot.paramMap.get('id');
    if (this.dealId) {
      this.isEditMode = true;
      this.pageTitle = 'Edit Deal';
      this.apiService.getDealById(this.dealId).subscribe(deal => {
        // Format the date correctly for the date input
        const formattedDeal = {
          ...deal,
          closeDate: new Date(deal.closeDate).toISOString().split('T')[0]
        };
        this.dealForm.patchValue(formattedDeal);
      });
    }
  }

  onSubmit(): void {
    if (this.dealForm.invalid) {
      this.dealForm.markAllAsTouched();
      return;
    }

    if (this.isEditMode && this.dealId) {
      const updateCommand = { id: this.dealId, ...this.dealForm.value };
      this.apiService.updateDeal(updateCommand).subscribe({
        next: () => {
          this.toastr.success('Deal updated successfully!');
          this.router.navigate(['/deals', this.dealId]);
        },
        error: () => this.toastr.error('Failed to update deal.')
      });
    } else {
      this.apiService.createDeal(this.dealForm.value).subscribe({
        next: () => {
          this.toastr.success('Deal created successfully!');
          this.router.navigate(['/deals']);
        },
        error: () => this.toastr.error('Failed to create deal.')
      });
    }
  }
}
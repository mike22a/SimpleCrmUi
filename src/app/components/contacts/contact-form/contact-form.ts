import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Api, ContactDto } from '../../../services/api';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.css']
})
export class ContactForm implements OnInit {
  contactForm: FormGroup;
  isEditMode = false;
  contactId: string | null = null;
  pageTitle = 'Create New Contact';

  constructor(
    private fb: FormBuilder,
    private apiService: Api,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService // We'll set this up in a moment
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['']
    });
  }

  ngOnInit(): void {
    this.contactId = this.route.snapshot.paramMap.get('id');
    if (this.contactId) {
      this.isEditMode = true;
      this.pageTitle = 'Edit Contact';
      this.apiService.getContactById(this.contactId).subscribe(contact => {
        this.contactForm.patchValue(contact); // Pre-fill the form
      });
    }
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    if (this.isEditMode && this.contactId) {
      const updateCommand = { id: this.contactId, ...this.contactForm.value };
      this.apiService.updateContact(updateCommand).subscribe({
        next: () => {
          this.toastr.success('Contact updated successfully!');
          this.router.navigate(['/contacts', this.contactId]);
        },
        error: (err) => this.toastr.error('Failed to update contact.')
      });
    } else {
      this.apiService.createContact(this.contactForm.value).subscribe({
        next: () => {
          this.toastr.success('Contact created successfully!');
          this.router.navigate(['/contacts']);
        },
        error: (err) => this.toastr.error('Failed to create contact.')
      });
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { Api, ContactDto } from '../../../services/api';
import { Auth } from '../../../services/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact-list.html',
  styleUrls: ['./contact-list.css']
})
export class ContactList implements OnInit {
  contacts: ContactDto[] = [];

  constructor(
    private apiService: Api,
    private authService: Auth // Inject AuthService
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.apiService.getContacts().subscribe({
      next: (data) => {
        this.contacts = data;
      },
      error: (err) => {
        // This could happen if the token is invalid or expired
        console.error('Error loading contacts:', err);
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
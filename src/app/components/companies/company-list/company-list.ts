import { Component, OnInit } from '@angular/core';
import { Api, CompanyDto } from '../../../services/api';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './company-list.html',
  styleUrls: ['./company-list.css']
})
export class CompanyList implements OnInit {
  companies: CompanyDto[] = [];

  constructor(private apiService: Api) {}

  ngOnInit(): void {
    this.apiService.getCompanies().subscribe({
      next: (data) => {
        this.companies = data;
      },
      error: (err) => {
        console.error('Error loading companies:', err);
      }
    });
  }
}
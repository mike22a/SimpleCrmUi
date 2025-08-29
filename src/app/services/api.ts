import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Contact dto
export interface ContactDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
}

export interface CreateContactCommand {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
}

export interface UpdateContactCommand {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
}

// Company dto
export interface CompanyDto {
  id: string;
  name: string;
  industry?: string;
  website?: string;
}

export interface CreateCompanyCommand {
  name: string;
  industry?: string;
  website?: string;
}

export interface UpdateCompanyCommand extends CreateCompanyCommand {
  id: string;
}

// Deals dto
export interface DealDto {
  id: string;
  title: string;
  value: number;
  stage: string;
  closeDate: Date;
  contactId: string;
}

export interface CreateDealCommand {
  title: string;
  value: number;
  stage: string;
  closeDate: Date;
  contactId: string;
}

export interface UpdateDealCommand extends CreateDealCommand {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class Api {
  private readonly apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) { }

  // Contacts Methods
  getContacts(): Observable<ContactDto[]> {
    return this.http.get<ContactDto[]>(`${this.apiUrl}/contacts`);
  }

  getContactById(id: string): Observable<ContactDto> {
    return this.http.get<ContactDto>(`${this.apiUrl}/contacts/${id}`);
  }

  createContact(command: CreateContactCommand): Observable<any> {
    return this.http.post(`${this.apiUrl}/contacts`, command);
  }

  updateContact(command: UpdateContactCommand): Observable<any> {
    return this.http.put(`${this.apiUrl}/contacts/${command.id}`, command);
  }

  deleteContact(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/contacts/${id}`);
  }

  // Company Methods
  getCompanies(): Observable<CompanyDto[]> {
    return this.http.get<CompanyDto[]>(`${this.apiUrl}/companies`);
  }

  getCompanyById(id: string): Observable<CompanyDto> {
    return this.http.get<CompanyDto>(`${this.apiUrl}/companies/${id}`);
  }

  createCompany(command: CreateCompanyCommand): Observable<any> {
    return this.http.post(`${this.apiUrl}/companies`, command);
  }

  updateCompany(command: UpdateCompanyCommand): Observable<any> {
    return this.http.put(`${this.apiUrl}/companies/${command.id}`, command);
  }

  deleteCompany(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/companies/${id}`);
  }

  // Deal Methods
  getDeals(): Observable<DealDto[]> {
    return this.http.get<DealDto[]>(`${this.apiUrl}/deals`);
  }

  getDealById(id: string): Observable<DealDto> {
    return this.http.get<DealDto>(`${this.apiUrl}/deals/${id}`);
  }

  createDeal(command: CreateDealCommand): Observable<any> {
    return this.http.post(`${this.apiUrl}/deals`, command);
  }

  updateDeal(command: UpdateDealCommand): Observable<any> {
    return this.http.put(`${this.apiUrl}/deals/${command.id}`, command);
  }

  deleteDeal(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deals/${id}`);
  }
  
  getDealStages(): Observable<string[]> {
  return this.http.get<string[]>(`${this.apiUrl}/deals/stages`);
}
}
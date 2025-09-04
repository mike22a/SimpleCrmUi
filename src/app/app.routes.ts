import { Routes } from '@angular/router';
import { ContactList } from './components/contacts/contact-list/contact-list';
import { ContactForm } from './components/contacts/contact-form/contact-form';
import { ContactDetail } from './components/contacts/contact-detail/contact-detail';
import { CompanyList } from './components/companies/company-list/company-list';
import { Login } from './components/login/login';
import { authGuard } from './guards/auth-guard';
import { CompanyForm } from './components/companies/company-form/company-form';
import { CompanyDetail } from './components/companies/company-detail/company-detail';
import { DealList } from './components/deals/deal-list/deal-list';
import { DealForm } from './components/deals/deal-form/deal-form';
import { DealDetail } from './components/deals/deal-detail/deal-detail';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
  { path: 'login', component: Login },

  // Contact Routes
  { 
    path: 'contacts', 
    component: ContactList,
    canActivate: [authGuard] // This route is now protected
  },
  {
    path: 'contacts/new',
    component: ContactForm,
    canActivate: [authGuard]
  },
  {
    path: 'contacts/:id',
    component: ContactDetail,
    canActivate: [authGuard]
  },
  {
    path: 'contacts/:id',
    component: ContactDetail,
    canActivate: [authGuard]
  },
  {
    path: 'contacts/:id/edit',
    component: ContactForm,
    canActivate: [authGuard]
  },

  // Company Routes
  { path: 'companies', component: CompanyList, canActivate: [authGuard] },
  { path: 'companies/new', component: CompanyForm, canActivate: [authGuard] },
  { path: 'companies/:id', component: CompanyDetail, canActivate: [authGuard] },
  { path: 'companies/:id/edit', component: CompanyForm, canActivate: [authGuard] },

  // Deal Routes
  { path: 'deals', component: DealList, canActivate: [authGuard] },
  { path: 'deals/new', component: DealForm, canActivate: [authGuard] },
  { path: 'deals/:id', component: DealDetail, canActivate: [authGuard] },
  { path: 'deals/:id/edit', component: DealForm, canActivate: [authGuard] },

  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/dashboard' } 
];
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { App } from './app';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { Dashboard } from './components/dashboard/dashboard';
import { Navbar } from './components/layout/navbar/navbar';
import { DealList } from './components/deals/deal-list/deal-list';
import { DealDetail } from './components/deals/deal-detail/deal-detail';
import { Api } from './services/api';

@NgModule({
  declarations: [
    // App,
    // Dashboard,
    // Navbar,
    // DealList,
    // DealDetail
    // NOTE: Other components like DealFormComponent would be declared here too.
  ],
  imports: [
    // BrowserModule,
    // routes,
    HttpClientModule,
    BrowserAnimationsModule, // <-- Import BrowserAnimationsModule
    NgxChartsModule         // <-- Import NgxChartsModule
  ],
  providers: [Api], // <-- Services are provided here
//   bootstrap: [App]
})
export class AppModule { }

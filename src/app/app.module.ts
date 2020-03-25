import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarberComponent } from './components/barber/barber.component';
import { ServiceComponent } from './components/service/service.component';
import { BarberModalComponent } from './components/modals/barber-modal/barber-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    BarberComponent,
    ServiceComponent,
    BarberModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents: [ BarberModalComponent ]
})
export class AppModule { }

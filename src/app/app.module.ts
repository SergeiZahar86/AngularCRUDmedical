import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardPatientsComponent } from './dashboard-patients/dashboard-patients.component';
import { ModalAddPatientComponent } from './dashboard-patients/modal-add-patient/modal-add-patient.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ModalShowVisitComponent } from './dashboard-patients/modal-show-visit/modal-show-visit.component';
import { ModalAddVisitComponent } from './dashboard-patients/modal-show-visit/modal-add-visit/modal-add-visit.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalAddPatientComponent,
    DashboardPatientsComponent,
    ModalShowVisitComponent,
    ModalAddVisitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

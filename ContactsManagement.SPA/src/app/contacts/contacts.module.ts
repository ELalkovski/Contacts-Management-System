import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateUpdateContactComponent } from './create-update-contact/create-update-contact.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ToastModule } from "primeng/toast";
import { TableModule } from 'primeng/table';
import { ContactsOverviewComponent } from './contacts-overview/contacts-overview.component';
import { EffectsModule } from '@ngrx/effects';
import { ContactsEffects } from './state-management/contacts.effects';

@NgModule({
  declarations: [
    CreateUpdateContactComponent,
    ContactsOverviewComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    InputTextModule,
    CalendarModule,
    ConfirmDialogModule,
    FormsModule,
    MessagesModule,
    ToastModule,
    TableModule,
    EffectsModule.forFeature([ContactsEffects])
  ],
  providers: [
    ConfirmationService,
  ]
})
export class ContactsModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ContactsModule } from './contacts/contacts.module';
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from 'src/service/api.service';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastModule } from "primeng/toast";
import { AboutComponent } from './about/about.component';
import { contactsReducer } from './contacts/state-management/contacts.reducer';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    RouterModule,
    FormsModule,
    NgbModule,
    ContactsModule,
    HttpClientModule,
    ToastModule,
    StoreModule.forRoot({ contactsState: contactsReducer }),
    EffectsModule.forRoot([])
  ],
  providers: [
    ApiService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

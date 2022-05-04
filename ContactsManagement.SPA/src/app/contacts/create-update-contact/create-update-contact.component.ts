import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ContactDto } from '../dtos/contactDto';
import { CreateUpdateContactCommand } from '../dtos/createUpdateContactCommand';
import { createContact, createContactSuccess, getContactById, setErrorMessage, updateContact, updateContactSuccess } from '../state-management/contacts.actions';
import { ContactsState } from '../state-management/contacts.reducer';
import { selectContactsState } from '../state-management/contacts.selector';

@Component({
  selector: 'app-create-update-contact',
  templateUrl: './create-update-contact.component.html',
  styleUrls: ['./create-update-contact.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CreateUpdateContactComponent implements OnInit, OnDestroy {

  @ViewChild('contactsForm', { read: NgForm }) form: NgForm;

  private subscriptions: Subscription[] = [];

  public contactDto: CreateUpdateContactCommand;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private store: Store<{ state: ContactsState }>
  ) { }

  ngOnInit(): void {
    this.contactDto = new CreateUpdateContactCommand();

    this.subscriptions.push(this.activatedRoute.params.subscribe((params) => {
      if (params && params['id']) {
        this.loadContact(params['id']);
      }
    }));

    this.subscribeForCurrentState();
  }

  ngOnDestroy(): void {
    if (this.subscriptions && this.subscriptions.length > 0) {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
  }

  public onSubmit(): void {
    this.confirmationService.confirm({
      message: this.contactDto.id ?
        'Are you sure that you want to update this contact?' :
        'Are you sure that you want to create this contact?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        if (this.form.valid) {
          this.contactDto.phoneNumber = this.contactDto.phoneNumber?.toString();
          // Set correct date regarding locale format
          this.contactDto.dateOfBirth = new Date(this.contactDto.dateOfBirth.getTime() - this.contactDto.dateOfBirth.getTimezoneOffset() * 60000);

          if (this.contactDto.id) {
            this.store.dispatch(updateContact({ createUpdateContact: this.contactDto }));
          } else {
            this.store.dispatch(createContact({ createUpdateContact: this.contactDto }));
          }
        } else {
          this.touchFormControls();
        }
      }
    });
  }

  public onCancel(): void {
    this.router.navigate(['contacts/overview']);
  }

  private loadContact(contactId: string): void {
    this.store.dispatch(getContactById({ contactId }));
  }

  private assignContact(contact: ContactDto): void {
    this.contactDto = { ...contact };
    this.contactDto.dateOfBirth = new Date(contact.dateOfBirth.toString().replace(/-/g, '\/').replace(/T.+/, ''));
  }

  private subscribeForCurrentState(): void {
    this.subscriptions.push(this.store.select(selectContactsState).subscribe(state => {
      // Details contact
      if (state.contactDto) {
        this.assignContact(state.contactDto);
      }

      // Create contact
      if (state.contactId && state.isCreateSuccessful) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Contact created sucessfully!' });
        this.store.dispatch(createContactSuccess({ contactId: null, isSuccess: false }));
        this.router.navigate(['contacts/overview'], { queryParams: { isSuccess: 'true' } });

      } else if(!state.isCreateSuccessful && state.errorMessage) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong while trying to create contact' });
        this.store.dispatch(setErrorMessage({ error: null }));
      }

      // Update contact
      if (state.contactDto && state.isUpdateSuccessful) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Contact updated sucessfully!' });
        this.assignContact(state.contactDto);
        this.store.dispatch(updateContactSuccess({ contactDto: null, isSuccess: false }));

      } else if (!state.isUpdateSuccessful && state.errorMessage) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong while trying to update contact' });
        this.store.dispatch(setErrorMessage({ error: null }));
      }
    }));
  }

  private touchFormControls(): void {
    for (const key in this.form.controls) {
      if (this.form.controls.hasOwnProperty(key)) {
        this.form.controls[key].markAsTouched();
      }
    }
  }
}


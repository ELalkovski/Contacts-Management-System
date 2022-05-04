import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { MyContactDto } from '../dtos/myContactDto';
import { deleteContact, deleteContactSuccess, getMyContactsPage, setErrorMessage } from '../state-management/contacts.actions';
import { ContactsState } from '../state-management/contacts.reducer';
import { selectContactsState } from '../state-management/contacts.selector';

@Component({
  selector: 'app-contacts-overview',
  templateUrl: './contacts-overview.component.html',
  styleUrls: ['./contacts-overview.component.css']
})
export class ContactsOverviewComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  public skip: number = 0;
  public take: number = 10;
  public contacts: MyContactDto[];
  public totalCount: number;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<{ state: ContactsState }>
  ) { }

  async ngOnInit() {
    this.subscriptions.push(this.activatedRoute.queryParams.subscribe((params) => {
      const isSuccessAction = params['isSuccess'];

      if (isSuccessAction) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Contact created sucessfully!' });
      }
    }));
    
    this.loadContacts(null);
    this.subscribeForCurrentState();
  }

  ngOnDestroy(): void {
    if (this.subscriptions && this.subscriptions.length > 0) {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
  }

  public loadContacts(event: any): void {
    if (event) {
      this.skip = event.first;
      this.take = event.rows;
    }

    this.store.dispatch(getMyContactsPage({ skip: this.skip, take: this.take }));
  }

  public onEdit(contactId: string): void {
    this.router.navigate([`contacts/edit/${contactId}`]);
  }

  public onDelete(contactId: string): void {
    this.confirmationService.confirm({
      message: 'This action is irreversible, are you sure you want to remove this contact?',
      header: 'Confirmation',
      icon: 'pi pi-trash',

      accept: () => {
        this.store.dispatch(deleteContact({ contactId: contactId }));
      }
    });
  }

  private subscribeForCurrentState(): void {
    this.subscriptions.push(this.store.select(selectContactsState).subscribe(state => {
      this.totalCount = state.myContactsPage?.totalCount!;
      this.contacts = state.myContactsPage?.contacts!;

      if (state.isDeleteSuccessful) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Contact was deleted sucessfully!' });
        this.store.dispatch(deleteContactSuccess({ result: false }));
        this.loadContacts(null);
      }
      if (!state.isDeleteSuccessful && state.errorMessage) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong while trying to delete contact' });
        this.store.dispatch(deleteContactSuccess({ result: false }));
        this.store.dispatch(setErrorMessage({ error: null }));
      }
    }));
  }
}

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap, of, withLatestFrom } from "rxjs";
import { ApiService } from "src/service/api.service";
import { ContactsState } from "./contacts.reducer";
import { selectContactsState } from "./contacts.selector";
import {
    deleteContact,
    getMyContactsPage,
    deleteContactSuccess,
    getMyContactsPageSuccess,
    updateContact,
    updateContactSuccess,
    createContact,
    createContactSuccess,
    setErrorMessage,
    getContactById,
    getContactByIdSuccess
} from "./contacts.actions";


@Injectable()
export class ContactsEffects {
    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private store: Store<{ contactsState: ContactsState }>
    ) { }

    loadContacts$ = createEffect(() => this.actions$.pipe(
        ofType(getMyContactsPage),
        withLatestFrom(this.store.select(selectContactsState)),
        mergeMap(([action, latest]) => {
            return this.apiService.getMyContacts(latest.skip, latest.take)
                .pipe(
                    map(myContactsPage => (getMyContactsPageSuccess({ myContactsPage: myContactsPage }))),
                    catchError(() => of(setErrorMessage({ error: 'Something went wrong while trying to create new contact' })))
                )
        })
    )
    );

    getContact$ = createEffect(() => this.actions$.pipe(
        ofType(getContactById),
        withLatestFrom(this.store.select(selectContactsState)),
        mergeMap(([action, latest]) => {
            return this.apiService.getContact(latest.contactId!)
                .pipe(
                    map(contactDto => (getContactByIdSuccess({ contactDto: contactDto }))),
                    catchError(() => of(setErrorMessage({ error: 'Something went wrong while trying to open last contact' })))
                )
        })
    )
    );

    createContact$ = createEffect(() => this.actions$.pipe(
        ofType(createContact),
        withLatestFrom(this.store.select(selectContactsState)),
        mergeMap(([action, latest]) => {
            return this.apiService.createContact(latest.createUpdateContact!)
                .pipe(
                    map((contactId) => (createContactSuccess({ contactId: contactId, isSuccess: true }))),
                    catchError(() => of(setErrorMessage({ error: 'Something went wrong while trying to create new contact' })))
                )
        })
    )
    );

    updateContact$ = createEffect(() => this.actions$.pipe(
        ofType(updateContact),
        withLatestFrom(this.store.select(selectContactsState)),
        mergeMap(([action, latest]) => {
            return this.apiService.updateContact(latest.createUpdateContact!)
                .pipe(
                    map((contactDto) => (updateContactSuccess({ contactDto: contactDto, isSuccess: true }))),
                    catchError(() => of(setErrorMessage({ error: 'Something went wrong while trying to update contact' })))
                )
        })
    )
    );

    deleteContact$ = createEffect(() => this.actions$.pipe(
        ofType(deleteContact),
        withLatestFrom(this.store.select(selectContactsState)),
        mergeMap(([action, latest]) => {
            return this.apiService.deleteContact(latest.contactId!)
                .pipe(
                    map((isSuccess) => (deleteContactSuccess({ result: isSuccess }))),
                    catchError(() => of(setErrorMessage({ error: 'Something went wrong while trying to delete contact' })))
                )
        })
    )
    );
}
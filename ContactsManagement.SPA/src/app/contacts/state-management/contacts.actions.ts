import { createAction, props } from "@ngrx/store";
import { ContactDto } from "../dtos/contactDto";
import { CreateUpdateContactCommand } from "../dtos/createUpdateContactCommand";
import { MyContactsPageDto } from "../dtos/myContactsPageDto";

export const setErrorMessage = createAction('[Contact Common] Set error message',
    props<{ error: string | null }>());

export const getMyContactsPage = createAction('[Contacts Overview Page] Get my contacts page',
    props<{ skip: number, take: number }>());

export const getMyContactsPageSuccess = createAction('[Contacts Overview Page] Get my contacts page success',
    props<{ myContactsPage: MyContactsPageDto }>());

export const getContactById = createAction('[Contact Create Update Page] Get contact by id',
    props<{ contactId: string }>());

export const getContactByIdSuccess = createAction('[Contacts Details Page] Get contact by id success',
    props<{ contactDto: ContactDto }>());

export const createContact = createAction('[Contact Create Update Page] Create contact',
    props<{ createUpdateContact: CreateUpdateContactCommand }>());

export const createContactSuccess = createAction('[Contact Create Update Page] Create contact success',
    props<{ contactId: string | null, isSuccess: boolean }>());

export const updateContact = createAction('[Contact Create Update Page] Update contact',
    props<{ createUpdateContact: CreateUpdateContactCommand }>());

export const updateContactSuccess = createAction('[Contact Create Update Page] Update contact success',
    props<{ contactDto: ContactDto | null, isSuccess: boolean }>());

export const deleteContact = createAction('[Contacts Overview Page] Delete contact',
    props<{ contactId: string }>());

export const deleteContactSuccess = createAction('[Contacts Overview Page] Delete contact success',
    props<{ result: boolean }>());
import { createReducer, on } from "@ngrx/store";
import { ContactDto } from "../dtos/contactDto";
import { CreateUpdateContactCommand } from "../dtos/createUpdateContactCommand";
import { MyContactsPageDto } from "../dtos/myContactsPageDto";
import {
    deleteContact,
    getMyContactsPage,
    deleteContactSuccess,
    updateContact,
    updateContactSuccess,
    createContact,
    createContactSuccess,
    getMyContactsPageSuccess,
    setErrorMessage,
    getContactById,
    getContactByIdSuccess
} from "./contacts.actions";


export interface ContactsState {
    skip: number;
    take: number;
    myContactsPage: MyContactsPageDto | null;
    createUpdateContact: CreateUpdateContactCommand | null;
    contactDto: ContactDto | null;
    contactId: string | null;
    isCreateSuccessful: boolean;
    isUpdateSuccessful: boolean;
    isDeleteSuccessful: boolean;
    errorMessage: string | null;
}

export const initialState: ContactsState = {
    skip: 0,
    take: 10,
    myContactsPage: null,
    contactDto: null,
    createUpdateContact: null,
    contactId: null,
    isCreateSuccessful: false,
    isUpdateSuccessful: false,
    isDeleteSuccessful: false,
    errorMessage: null,
}

export const contactsReducer = createReducer(
    initialState,
    on(getMyContactsPage, (state, { skip, take }) => ({ ...state, skip, take })),
    on(getMyContactsPageSuccess, (state, { myContactsPage }) => ({ ...state, myContactsPage: myContactsPage })),
    on(getContactById, (state, { contactId }) => ({ ...state, contactId: contactId })),
    on(getContactByIdSuccess, (state, { contactDto }) => ({ ...state, contactDto: contactDto })),
    on(createContact, (state, { createUpdateContact }) => ({ ...state, createUpdateContact: createUpdateContact })),
    on(createContactSuccess, (state, { contactId, isSuccess }) => ({ ...state, contactId: contactId, isCreateSuccessful: isSuccess })),
    on(setErrorMessage, (state, { error }) => ({ ...state, errorMessage: error })),
    on(updateContact, (state, { createUpdateContact }) => ({ ...state, createUpdateContact: createUpdateContact })),
    on(updateContactSuccess, (state, { contactDto, isSuccess }) => ({ ...state, contactDto: contactDto, isUpdateSuccessful: isSuccess })),
    on(deleteContact, (state, { contactId }) => ({ ...state, contactId: contactId })),
    on(deleteContactSuccess, (state, { result }) => ({ ...state, isDeleteSuccessful: result })),
);
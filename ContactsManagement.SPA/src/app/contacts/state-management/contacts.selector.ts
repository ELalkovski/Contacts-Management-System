import { ContactsState } from "./contacts.reducer";


export const selectContactsState = (state: any) => state['contactsState'] as ContactsState;
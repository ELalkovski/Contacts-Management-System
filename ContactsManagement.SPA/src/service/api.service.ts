import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { CreateUpdateContactCommand } from "../app/contacts/dtos/createUpdateContactCommand"
import { map, Observable } from "rxjs";
import { MyContactsPageDto } from "src/app/contacts/dtos/myContactsPageDto";
import { ContactDto } from "src/app/contacts/dtos/contactDto";

@Injectable()
export class ApiService {

    private readonly backendApiPath = "https://localhost:5001/api";
    private readonly httpHeader: {};

    constructor(
        private http: HttpClient
    ) {
        this.httpHeader = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
    }

    public createContact(createContactCommand: CreateUpdateContactCommand): Observable<string> {
        return this.http
            .post(`${this.backendApiPath}/contacts`, createContactCommand, this.httpHeader)
            .pipe(
                map(response => {
                    const result = <string>response;
                    return result;
                }));
    }

    public updateContact(updateContactCommand: CreateUpdateContactCommand): Observable<ContactDto> {
        return this.http
            .put(`${this.backendApiPath}/contacts/${updateContactCommand.id}`, updateContactCommand, this.httpHeader)
            .pipe(
                map(response => {
                    const result = <ContactDto>response;
                    return result;
                }));
    }

    public deleteContact(contactId: string): Observable<boolean> {
        return this.http
            .delete(`${this.backendApiPath}/contacts/${contactId}`)
            .pipe(
                map(response => {
                    const result = <boolean>response;
                    return result;
                }));
    }

    public getMyContacts(skip: number, take: number): Observable<MyContactsPageDto> {
        return this.http
            .get(`${this.backendApiPath}/contacts?skip=${skip}&take=${take}`)
            .pipe(
                map(response => {
                    const result = <MyContactsPageDto>response;
                    return result;
                }));
    }

    public getContact(contactId: string): Observable<ContactDto> {
        return this.http
            .get(`${this.backendApiPath}/contacts/${contactId}`)
            .pipe(
                map(response => {
                    const result = <ContactDto>response;
                    return result;
                }));
    }
}

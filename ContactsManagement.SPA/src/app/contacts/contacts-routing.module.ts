import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ContactsOverviewComponent } from "./contacts-overview/contacts-overview.component";
import { CreateUpdateContactComponent } from "./create-update-contact/create-update-contact.component";



@NgModule({
    imports: [RouterModule.forChild([
        { path: 'create', component: CreateUpdateContactComponent },
        { path: 'edit/:id', component: CreateUpdateContactComponent },
        { path: 'overview', component: ContactsOverviewComponent },
    ])],
    exports: [RouterModule]
})
export class ContactsRoutingModule { }
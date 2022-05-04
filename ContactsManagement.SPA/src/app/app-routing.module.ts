import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";

const routes: Routes = [
    {
        path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule),
    },
    {
        path: '', component: AboutComponent
    },
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
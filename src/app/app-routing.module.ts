import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:"",redirectTo:"ContactList",pathMatch:'full'},
  {path:"ContactList",component:ContactListComponent},
  {path:"AddNew",component:NewContactComponent},
  {path:"profile/:index/:number",component:ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{anchorScrolling: 'enabled',useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WhenWhereComponent } from './when-where/when-where.component';
import { CeremonyDetailsComponent } from './ceremony-details/ceremony-details.component';
import { RsvpComponent } from './rsvp/rsvp.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth-guard';
import { RsvpDetailsComponent } from './rsvp-details/rsvp-details.component';
import { TimelineComponent } from './timeline/timeline.component';
import { AddGuestsComponent } from './add-guests/add-guests.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'whenwhere', component: WhenWhereComponent },
    { path: 'ceremony', component: CeremonyDetailsComponent },
    { path: 'ourStory', component: TimelineComponent },
    { path: 'rsvp', component: RsvpComponent },
    { path: 'createUser', component: SignupComponent },
    // { path: 'createUser', component: SignupComponent, canActivate: [AuthGuard] },
    { path: 'rsvp-details', component: RsvpDetailsComponent, canActivate: [AuthGuard] },
    { path: 'guests', component: AddGuestsComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}

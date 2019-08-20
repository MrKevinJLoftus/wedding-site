import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WhenWhereComponent } from './when-where/when-where.component';
import { CeremonyDetailsComponent } from './ceremony-details/ceremony-details.component';
import { RsvpComponent } from './rsvp/rsvp.component';
import { AuthGuard } from './auth/auth-guard';
import { RsvpDetailsComponent } from './rsvp-details/rsvp-details.component';
import { TimelineComponent } from './timeline/timeline.component';
import { WeddingDetailsComponent } from './wedding-details/wedding-details.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'whenwhere', component: WhenWhereComponent },
    { path: 'ceremony', component: CeremonyDetailsComponent },
    { path: 'ourStory', component: TimelineComponent },
    { path: 'rsvp-details', component: RsvpDetailsComponent, canActivate: [AuthGuard] },
    { path: 'wedding-details', component: WeddingDetailsComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}

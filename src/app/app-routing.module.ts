import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WhenWhereComponent } from './when-where/when-where.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CeremonyDetailsComponent } from './ceremony-details/ceremony-details.component';
import { RsvpComponent } from './rsvp/rsvp.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth-guard';
import { AuthAdminGuard } from './auth/auth-admin-guard';
import { RsvpDetailsComponent } from './rsvp-details/rsvp-details.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'whenwhere', component: WhenWhereComponent },
    // { path: 'gallery', component: GalleryComponent },
    { path: 'ceremony', component: CeremonyDetailsComponent }
    // { path: 'rsvp', component: RsvpComponent },
    // { path: 'createUser', component: SignupComponent },
    // { path: 'createUser', component: SignupComponent, canActivate: [AuthGuard, AuthAdminGuard] },
    // { path: 'rsvp-details', component: RsvpDetailsComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard, AuthAdminGuard]
})
export class AppRoutingModule {}

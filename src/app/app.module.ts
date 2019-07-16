import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { CoupleSectionComponent } from './couple-section/couple-section.component';
import { CountdownComponent } from './countdown/countdown.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { WhenWhereComponent } from './when-where/when-where.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CeremonyDetailsComponent } from './ceremony-details/ceremony-details.component';
import { ParallaxModule, ParallaxConfig } from '../../node_modules/ngx-parallax';
import { NguiStickyModule } from '../../node_modules/@ngui/sticky';
import { RsvpComponent } from './rsvp/rsvp.component';
import { RsvpDetailsComponent } from './rsvp-details/rsvp-details.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '../../node_modules/@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { TimelineComponent } from './timeline/timeline.component';
import { GuestComponent } from './rsvp-details/guest/guest.component';
import { MessageComponent } from './message/message.component';
import { WeddingDetailsComponent } from './wedding-details/wedding-details.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { HttpErrorInterceptor } from './httperror.interceptor';
import { AddGuestsComponent } from './admin/add-guests/add-guests.component';
import { RsvpReportComponent } from './admin/reports/rsvp/rsvp-report.component';
import { CreateUserComponent } from './admin/create-user/create-user.component';
import { GuestReportComponent } from './admin/reports/guest/guest.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { ReportsComponent } from './admin/reports/reports/reports.component';
import { GuestTextComponent } from './admin/reports/guest-text/guest-text.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    CoupleSectionComponent,
    CountdownComponent,
    FooterComponent,
    HeaderComponent,
    WhenWhereComponent,
    GalleryComponent,
    AboutUsComponent,
    CeremonyDetailsComponent,
    RsvpComponent,
    RsvpDetailsComponent,
    TimelineComponent,
    GuestComponent,
    MessageComponent,
    WeddingDetailsComponent,
    LoadingSpinnerComponent,
    AddGuestsComponent,
    RsvpReportComponent,
    CreateUserComponent,
    GuestReportComponent,
    ReportsComponent,
    GuestTextComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ParallaxModule,
    NguiStickyModule,
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

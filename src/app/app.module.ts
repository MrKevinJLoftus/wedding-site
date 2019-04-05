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

import { SignupComponent } from './auth/signup/signup.component';
import { RsvpDetailsComponent } from './rsvp-details/rsvp-details.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '../../node_modules/@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { TimelineComponent } from './timeline/timeline.component';
import { AddGuestsComponent } from './add-guests/add-guests.component';
import { GuestComponent } from './rsvp-details/guest/guest.component';
import { MessageComponent } from './message/message.component';
import { WeddingDetailsComponent } from './wedding-details/wedding-details.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

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
    SignupComponent,
    RsvpDetailsComponent,
    TimelineComponent,
    AddGuestsComponent,
    GuestComponent,
    MessageComponent,
    WeddingDetailsComponent,
    LoadingSpinnerComponent
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
    AlertModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

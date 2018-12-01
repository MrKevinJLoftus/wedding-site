import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { CoupleSectionComponent } from './couple-section/couple-section.component';
import { CountdownComponent } from './countdown/countdown.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
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
import { AngularMaterialModule } from './angular-material.module';
import { TimelineComponent } from './timeline/timeline.component';

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
    TimelineComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ParallaxModule,
    NguiStickyModule,
    AngularMaterialModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

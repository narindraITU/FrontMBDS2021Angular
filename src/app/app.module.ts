import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { RenduDirective } from './shared/rendu.directive';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SpinnerComponent} from './BaseComponents/Spinner/SpinnerComponent';
import {AuthModule} from './auth/auth.module';
import {AngularMaterialModule} from './angular.material.module';
import {AuthInterceptor} from "./shared/Auth.interceptor";
import {QuicklinkModule} from "ngx-quicklink";
import {TokenInterceptor} from "./shared/Token.interceptor";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
  declarations: [
    AppComponent,
    RenduDirective,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AuthModule,
    AngularMaterialModule,
    QuicklinkModule,
  ],
  exports: [
    AngularMaterialModule,
    RenduDirective,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor ,multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor ,multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

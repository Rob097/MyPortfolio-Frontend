import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/Structure/header/header.component';
import { LeftMenuComponent } from './components/Structure/left-menu/left-menu.component';
import { SidenavService } from './services/sidenav.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/* Main module of the application.
In this module are declared the main components of the application.
In particular, the components inside the Structure folder.

In here are also imported the various module used for the different functionalities of the app and the main routingModule
*/

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftMenuComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [ SidenavService ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

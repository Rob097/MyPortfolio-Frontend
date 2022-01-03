import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/structure/header/header.component';
import { LeftMenuComponent } from './components/structure/left-menu/left-menu.component';
import { RightMenuComponent } from './components/structure/right-menu/right-menu.component';
import { SidenavService } from './services/sidenav.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthenticationModule } from './authentication/authentication.module';
import { ProfileComponent } from './components/profile/profile.component';

/* Firebase services + enviorment module
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';*/

/*import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';*/
import { AuthenticationService } from './services/authentication.service';
import { interceptorProviders } from './helpers/interceptors/interceptors';
import { ToastrModule } from 'ngx-toastr';


/* Main module of the application.
In this module are declared the main components of the application.
In particular, the components inside the Structure folder.

In here are also imported the various module used for the different functionalities of the app and the main routingModule
*/

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftMenuComponent,
    RightMenuComponent,
    ProfileComponent
  ],
  imports: [
    /*AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireAuthModule,*/
    AuthenticationModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [ interceptorProviders, SidenavService, AuthenticationService/*, AngularFirestore */],
  bootstrap: [AppComponent]
})
export class AppModule {}

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

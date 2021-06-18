import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {NavbarModule, WavesModule, ButtonsModule, ModalModule, TooltipModule, PopoverModule} from 'angular-bootstrap-md';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MainNavComponent} from './main-nav/main-nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {CardsComponent} from './cards/cards.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {HomepageComponent} from './homepage/homepage.component';
import {SkillsComponent} from './skills/skills.component';
import {WorkComponent} from './work/work.component';
import {AboutComponent} from './about/about.component';
import {PortfolioCardComponent} from './portfolio-card/portfolio-card.component';
import {LoadingComponent} from './loading/loading.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LoginComponent} from './login/login.component';
/*for testing forms*/
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpService} from './Services/http.service';
import {ChatBotComponent} from './chat-bot/chat-bot.component';
import {CategoriesComponent} from './categories/categories.component';
import {HomeComponent} from './home/home.component';
import {FooterComponent} from './footer/footer.component';
import {WorkDetailsComponent} from './work-details/work-details.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {InterceptorService} from './loader/interceptor.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AdministrationComponent} from './administration/administration.component';
import {ConnectComponent} from './connect/connect.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    CardsComponent,
    HomepageComponent,
    SkillsComponent,
    WorkComponent,
    AboutComponent,
    PortfolioCardComponent,
    LoadingComponent,
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    ChatBotComponent,
    CategoriesComponent,
    HomeComponent,
    FooterComponent,
    WorkDetailsComponent,
    AdministrationComponent,
    ConnectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    NavbarModule, WavesModule, ButtonsModule, BrowserAnimationsModule,
    MatToolbarModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule, ReactiveFormsModule, HttpClientModule,
    MatProgressBarModule, FontAwesomeModule, MatTooltipModule,
    FormsModule, ModalModule, TooltipModule, PopoverModule
  ],
  providers: [
    HttpService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

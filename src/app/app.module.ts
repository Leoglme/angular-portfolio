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
import {NavigationModule} from './administration/navigation/navigation.module';
import { ProjectsComponent } from './administration/projects/projects.component';
import { DashboardComponent } from './administration/dashboard/dashboard.component';
import {AdminCategoriesComponent} from './administration/categories/categories.component';
import { ColorPickerModule } from 'ngx-color-picker';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxStarRatingModule } from 'ngx-star-rating';
/*Custom Picker*/
import {CommonModule} from '@angular/common';
import {A11yModule} from '@angular/cdk/a11y';
import {BidiModule} from '@angular/cdk/bidi';
import {ObserversModule} from '@angular/cdk/observers';
import {OverlayModule} from '@angular/cdk/overlay';
import {PlatformModule} from '@angular/cdk/platform';
import {PortalModule} from '@angular/cdk/portal';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {MultiDatepickerModule} from './administration/multidatepicker/multidatepicker.module';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  exports: [
    A11yModule,
    BidiModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    CdkStepperModule,
    CdkTableModule,

    // Material
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ]
})
export class MaterialModule {}
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
    ConnectComponent,
    ProjectsComponent,
    DashboardComponent,
    AdminCategoriesComponent
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
    FormsModule, ModalModule, TooltipModule, PopoverModule, NavigationModule,
    ColorPickerModule,
    MatTabsModule, MatStepperModule,
    CommonModule,
    MaterialModule,
    MultiDatepickerModule,
    NgxStarRatingModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    HttpService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

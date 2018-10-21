import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule , Http} from '@angular/http';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import { Ng2UploaderModule } from 'ng2-uploader';
import {ModalModule} from "ng2-modal";
import { TitleCasePipe } from 'app/titlecasepipe';

import '../../node_modules/hammerjs/hammer.js';
import { LoaderService } from 'app/shared/loader.service';
import {ToasterModule, ToasterService, ToasterConfig} from 'angular2-toaster';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { httpService } from './shared/http.service';
import { UtilsService } from './shared/utils.service';
import { routes } from './app.routes';
import { User } from './models/user';
import { Appdata } from './models/appdata';
import { UploadAppdata } from './models/uploadAppdata';
import { SubscribeNotification } from './models/subscribenotification';
import { PagerService } from 'app/shared/pager.service';

import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { AppConstant } from './app.constant';
import { SignupComponent } from './developer/signup/signup.component';
import { LoginComponent } from './developer/login/login.component';
import { ForgotpasswordComponent } from './developer/forgotpassword/forgotpassword.component';
import { DeveloperComponent } from './developer/developer.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './developer/dashboard/dashboard.component';
import { HeaderComponent } from './developer/header/header.component';
import { MenudashboardComponent } from './developer/menudashboard/menudashboard.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { UsersComponent } from './developer/users/users.component';
import { UserActionComponent } from './developer/users/useraction/useraction.component';
import { AdminheaderComponent } from './admin/adminheader/adminheader.component';
import { AdminfooterComponent } from './admin/adminfooter/adminfooter.component';
import { AdminmenudashboardComponent } from './admin/adminmenudashboard/adminmenudashboard.component';
import { FooterComponent } from './developer/footer/footer.component';
import { AppsComponent } from './developer/apps/apps.component';
import { UploadappComponent } from './developer/apps/uploadapp/uploadapp.component';
import { AdminappsComponent } from './admin/adminapps/adminapps.component';
import { AdminAppRequestsComponent } from './admin/admin-app-requests/admin-app-requests.component';
import { AdminAccountRequestsComponent } from './admin/admin-account-requests/admin-account-requests.component';
import { PendingAccountComponent } from './developer/pending-account/pending-account.component';
import { RequestActionComponent } from './admin/admin-account-requests/request-action/request-action.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AdminUserActionComponent } from './admin/admin-user/admin-user-action/admin-user-action.component';
import { AppRequestActionComponent } from './admin/admin-app-requests/app-request-action/app-request-action.component';
import { AdminforgetpassComponent } from './admin/adminforgetpass/adminforgetpass.component';
import { AppsListActionComponent } from './admin/adminapps/apps-list-action/apps-list-action.component';
import { NotificationServerComponent } from './developer/notification-server/notification-server.component';
import { RegisterComponent } from './developer/notification-server/register/register.component';
import { PaymentStatusComponent } from './developer/payment-status/payment-status.component';

import { ResetPasswordComponent } from './admin/reset-password/reset-password.component';
import { AdminAppCategoryComponent } from './admin/admin-app-category/admin-app-category.component';
import { AppCategoryActionComponent } from './admin/admin-app-category/app-category-action/app-category-action.component';
import { DeveloperResetPasswordComponent } from './developer/developer-reset-password/developer-reset-password.component';
import {Ng2PaginationModule} from 'ng2-pagination';
import { PageNotFoundComponent } from './developer/page-not-found/page-not-found.component';
import { ProfileComponent } from './developer/profile/profile.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { ThanksComponent } from './developer/thanks/thanks.component';

import { ChartsModule } from 'ng2-charts';
import { AppsMenuDashboardComponent } from './admin/adminapps/apps-menu-dashboard/apps-menu-dashboard.component';
import { AppsDashboardComponent } from './admin/adminapps/apps-dashboard/apps-dashboard.component';
import { InstallLineChartComponent } from './admin/charts/install-line-chart/install-line-chart.component';
import { UninstallLineChartComponent } from './admin/charts/uninstall-line-chart/uninstall-line-chart.component';
import { DownloadsLineChartComponent } from './admin/charts/downloads-line-chart/downloads-line-chart.component';
import { AverageRatingLineChartComponent } from './admin/charts/average-rating-line-chart/average-rating-line-chart.component';
import { ReleaseManagementComponent } from './admin/adminapps/release-management/release-management.component';
import { ReviewRatingsComponent } from './admin/adminapps/review-ratings/review-ratings.component';
import { StatisticsComponent } from './admin/adminapps/statistics/statistics.component';
import { DeveloperAppMenuDashboardComponent } from './developer/apps/developer-app-menu-dashboard/developer-app-menu-dashboard.component';
import { DeveloperAppDashboardComponent } from './developer/apps/developer-app-dashboard/developer-app-dashboard.component';
import { DeveloperStatisticsComponent } from './developer/apps/developer-statistics/developer-statistics.component';
import { DeveloperRatingReviewComponent } from './developer/apps/developer-rating-review/developer-rating-review.component';
import { DeveloperReleaseManagementComponent } from './developer/apps/developer-release-management/developer-release-management.component';
import { DevInstallChartComponent } from './developer/apps/devchart/dev-install-chart/dev-install-chart.component';
import { DevUninstallChartComponent } from './developer/apps/devchart/dev-uninstall-chart/dev-uninstall-chart.component';
import { DevDownloadChartComponent } from './developer/apps/devchart/dev-download-chart/dev-download-chart.component';
import { DevAverageRatingChartComponent } from './developer/apps/devchart/dev-average-rating-chart/dev-average-rating-chart.component';
import { RequestsComponent } from './developer/requests/requests.component';
import { OrgUserRequestComponent } from './developer/org-user-request/org-user-request.component';
import { OrgUserActionReqComponent } from './developer/org-user-request/org-user-action-req/org-user-action-req.component';
import { ResourceRequestsComponent } from './admin/resource-requests/resource-requests.component';
import { ResourceRequestsActionComponent } from './admin/resource-requests/resource-requests-action/resource-requests-action.component';
import { TransactionSummaryComponent } from './admin/admin-user/transaction-summary/transaction-summary.component';
import { UserRequestsComponent } from './admin/admin-user/user-requests/user-requests.component';
import { ApplicationRequestsComponent } from './admin/adminapps/application-requests/application-requests.component';
import { UserTransactionsComponent } from './developer/user-transactions/user-transactions.component';
import { AuditTrailComponent } from './developer/audit-trail/audit-trail.component';
import { UserAuditTrailComponent } from './admin/admin-user/user-audit-trail/user-audit-trail.component';
import { AppHistoryComponent } from './developer/app-history/app-history.component';
import { UserAppHistoryComponent } from './admin/adminapps/user-app-history/user-app-history.component';


@NgModule({
  declarations: [ TitleCasePipe,
    AppComponent,
    SignupComponent,
    LoginComponent,
    DeveloperComponent,
    AdminComponent,
    ForgotpasswordComponent,
    DashboardComponent,
    HeaderComponent,
    MenudashboardComponent,
    AdminloginComponent,
    AdmindashboardComponent,
    UsersComponent,
    UserActionComponent,
    AdminheaderComponent,
    AdminfooterComponent,
    AdminmenudashboardComponent,
    FooterComponent,
    AppsComponent,
    //AppmenuComponent,
    UploadappComponent,
    AdminappsComponent,
    AdminAppRequestsComponent,
    AdminAccountRequestsComponent,
    PendingAccountComponent,
    RequestActionComponent,
    AdminUserComponent,
    AdminUserActionComponent,
    AppRequestActionComponent,
    AdminforgetpassComponent,
    AppsListActionComponent,
    NotificationServerComponent,
    RegisterComponent,
    PaymentStatusComponent,
    ResetPasswordComponent,
    AdminAppCategoryComponent,
    AppCategoryActionComponent,
    DeveloperResetPasswordComponent,
    PageNotFoundComponent,
    ProfileComponent,
    AdminProfileComponent,   
    ThanksComponent,
    AppsMenuDashboardComponent,
    AppsDashboardComponent,
    InstallLineChartComponent,
    UninstallLineChartComponent,
    DownloadsLineChartComponent,
    AverageRatingLineChartComponent,
    ReleaseManagementComponent,
    ReviewRatingsComponent,
    StatisticsComponent,
    DeveloperAppMenuDashboardComponent,
    DeveloperAppDashboardComponent,
    DeveloperStatisticsComponent,
    DeveloperRatingReviewComponent,
    DeveloperReleaseManagementComponent,
    DevInstallChartComponent,
    DevUninstallChartComponent,
    DevDownloadChartComponent,
    DevAverageRatingChartComponent,
    RequestsComponent,
    OrgUserRequestComponent,
    OrgUserActionReqComponent,
    ResourceRequestsComponent,
    ResourceRequestsActionComponent,
    TransactionSummaryComponent,
    UserRequestsComponent,
    ApplicationRequestsComponent,
    UserTransactionsComponent,
    AuditTrailComponent,
    UserAuditTrailComponent,
    AppHistoryComponent,
    UserAppHistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    Ng2UploaderModule,
    ToasterModule,
    BrowserAnimationsModule,
    ModalModule,
    Ng2PaginationModule,
    ChartsModule  
  ],
 providers: [httpService, UtilsService, LoaderService, PagerService, {provide:LocationStrategy, useClass:HashLocationStrategy}],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule { }

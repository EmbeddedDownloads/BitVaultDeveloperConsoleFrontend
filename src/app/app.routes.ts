// Import our dependencies
import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SignupComponent } from './developer/signup/signup.component';
import { LoginComponent } from './developer/login/login.component';
import { ForgotpasswordComponent } from './developer/forgotpassword/forgotpassword.component';
import { DashboardComponent } from './developer/dashboard/dashboard.component';
import { AppsComponent } from './developer/apps/apps.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { UsersComponent } from './developer/users/users.component';
import { UserActionComponent } from './developer/users/useraction/useraction.component';
import { UploadappComponent } from './developer/apps/uploadapp/uploadapp.component';
import { AdminappsComponent } from './admin/adminapps/adminapps.component';
import { AdminAccountRequestsComponent } from './admin/admin-account-requests/admin-account-requests.component';
import { PendingAccountComponent } from './developer/pending-account/pending-account.component';
import { RequestActionComponent } from './admin/admin-account-requests/request-action/request-action.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { AdminUserActionComponent } from './admin/admin-user/admin-user-action/admin-user-action.component';
import { AppRequestActionComponent } from './admin/admin-app-requests/app-request-action/app-request-action.component';
import { AdminAppRequestsComponent } from './admin/admin-app-requests/admin-app-requests.component';
import { AdminforgetpassComponent } from './admin/adminforgetpass/adminforgetpass.component';
import { AppsListActionComponent } from './admin/adminapps/apps-list-action/apps-list-action.component';
import { NotificationServerComponent } from './developer/notification-server/notification-server.component';
import { RegisterComponent } from './developer/notification-server/register/register.component';
import { PaymentStatusComponent } from './developer/payment-status/payment-status.component';
import { ResetPasswordComponent } from './admin/reset-password/reset-password.component';
import { AdminAppCategoryComponent } from './admin/admin-app-category/admin-app-category.component';
import { AppCategoryActionComponent } from './admin/admin-app-category/app-category-action/app-category-action.component';
import { DeveloperResetPasswordComponent } from './developer/developer-reset-password/developer-reset-password.component';
import { PageNotFoundComponent } from './developer/page-not-found/page-not-found.component';
import { ProfileComponent } from './developer/profile/profile.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { ThanksComponent } from './developer/thanks/thanks.component';
import { AppsDashboardComponent } from './admin/adminapps/apps-dashboard/apps-dashboard.component';
import { ReleaseManagementComponent } from './admin/adminapps/release-management/release-management.component';
import { ReviewRatingsComponent } from './admin/adminapps/review-ratings/review-ratings.component';
import { StatisticsComponent } from './admin/adminapps/statistics/statistics.component';
import { DeveloperAppDashboardComponent } from './developer/apps/developer-app-dashboard/developer-app-dashboard.component';
import { DeveloperStatisticsComponent } from './developer/apps/developer-statistics/developer-statistics.component';
import { DeveloperRatingReviewComponent } from './developer/apps/developer-rating-review/developer-rating-review.component';
import { DeveloperReleaseManagementComponent } from './developer/apps/developer-release-management/developer-release-management.component';
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


// Define which component should be loaded based on the current URL
export const routes: Routes = [
  {path: '',       component: LoginComponent },
  {path: 'login',  component: LoginComponent },
  {path: 'signup', component: SignupComponent },
  {path: 'forgot-pass', component: ForgotpasswordComponent },
  {path: 'dashboard', component: DashboardComponent },
  {path: 'adminlogin', component: AdminloginComponent },
  {path: 'admindashboard', component: AdmindashboardComponent },
  {path: 'admin-forget-password', component: AdminforgetpassComponent },
  {path: 'users', component: UsersComponent },
  {path: 'users/useraction', component: UserActionComponent },
  {path: 'users/useraction/:id', component: UserActionComponent },
  {path: 'apps', component: AppsComponent },  
  {path: 'dashboard/upload-app', component: UploadappComponent},  
  {path: 'appsdashboard/upload-app/:id/:version', component: UploadappComponent},  
  {path: 'appsdashboard/upload-app', component: UploadappComponent},
  {path: 'admin-apps-list', component: AdminappsComponent},
  {path: 'account-requests', component: AdminAccountRequestsComponent},
  {path: 'verify/email', component: PendingAccountComponent},
  {path: 'account-requests/account-request-action/:id', component: RequestActionComponent},
  {path: 'admin-users-list', component: AdminUserComponent},
  {path: 'admin-users-list/admin-user-action/:id', component: AdminUserActionComponent},
  {path: 'application-requests', component: AdminAppRequestsComponent},
  {path: 'application-requests/apps-request-action/:id', component: AppRequestActionComponent},
  {path: 'admin-apps-list/apps-list-action/:id/:version', component: AppsListActionComponent},
  {path: 'addon-services', component: NotificationServerComponent},
  {path: 'addon-services/register-app', component: RegisterComponent},
  {path: 'payment-status/:id/:status', component: PaymentStatusComponent},
  {path: 'admin/resetPassword/:id', component: ResetPasswordComponent},
  {path: 'resetPassword/:id', component: DeveloperResetPasswordComponent},
  {path: 'app-category', component: AdminAppCategoryComponent},
  {path: 'app-category/add-app-category', component: AppCategoryActionComponent},
  {path: 'app-category/edit-app-category/:id', component: AppCategoryActionComponent},
  {path: 'page-not-found', component: PageNotFoundComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'admin-profile', component: AdminProfileComponent},
  {path: 'admin-profile/:id', component: AdminProfileComponent},
  {path: 'thanks', component: ThanksComponent},
  {path: 'admin-apps-list/adminappdashboard', component: AppsDashboardComponent},
  {path: 'admin-apps-list/adminappdashboard/:title/:id/:version', component: AppsDashboardComponent},
  {path: 'admin-apps-list/statistics', component: StatisticsComponent},
  {path: 'admin-apps-list/review-ratings', component: ReviewRatingsComponent},
  {path: 'admin-apps-list/release-management', component: ReleaseManagementComponent},
  {path: 'admin-apps-list/apps-list-action', component: AppsListActionComponent},
  {path: 'developer/app/dashboard', component: DeveloperAppDashboardComponent},
  {path: 'developer/app/statistics', component: DeveloperStatisticsComponent},
  {path: 'developer/app/ratingreview', component: DeveloperRatingReviewComponent},
  {path: 'developer/app/releasemanagement', component: DeveloperReleaseManagementComponent},
  {path: 'my-requests', component: RequestsComponent},
  {path: 'org-requests', component: OrgUserRequestComponent},
  {path: 'more-user-request', component: OrgUserActionReqComponent},
  {path: 'resource-requests', component: ResourceRequestsComponent},
  {path: 'resource-requests/resource-requests-action/:id', component: ResourceRequestsActionComponent},
  {path: 'admin-users-list/transaction-summary/:id', component: TransactionSummaryComponent},
  {path: 'admin-users-list/user-requests/:id', component: UserRequestsComponent},
  {path: 'my-transactions', component: UserTransactionsComponent},
  {path: 'admin-apps-list/application-requests/:id/:appId', component: ApplicationRequestsComponent},
  {path: 'audit-trail', component: AuditTrailComponent},
  {path: 'admin-users-list/user-audit-trail/:id', component: UserAuditTrailComponent},
  {path: 'app-history/:id', component: AppHistoryComponent},
  {path: 'admin-apps-list/apps-audit-trail/:id', component: UserAppHistoryComponent},
  
  {path: '**',     component: PageNotFoundComponent }
];
export class AppConfig {
   public static API_LIVE_BASE_URL_Status=true;
   //public static SERVER_URL='http://bitvaultappstore.com/';
   //public static API_BASE_URL='http://bitvaultappstore.com:8080/cloud/rest/api/';
   //public IMG_BASE_URL='http://bitvaultappstore.com/assets/images/';   
   public static SERVER_URL='http://54.201.240.187/';
   public static API_BASE_URL='http://54.201.240.187:8080/cloud/rest/api/';
   public IMG_BASE_URL='http://54.201.240.187/assets/images/';   

   //NOTIFICATION SERVER API IP
   public static NOTIFICATIO_SERVER_NOTIFICATION_URL = 'http://34.209.234.181/v1/register-project';   

/** DEVELOPER API URLs **/
   public static DEV_LOGIN ='auth/login';
   public static DEV_SIGNUP ='v1/dev/user';
   public static DEV_DASHBOARD ='v1/dev/applicationByUserId';
   public static DEV_ADD_USER ='v1/dev/add/user';
   public static PUBLISH_DEV_APP_URL =  'v1/dev/updateAppStatus/';
   public static UPDATE_UPLOADED_APP_DETAILS = 'v1/dev/saveAppInfo/';
   public static UPLOAD_APP_IMAGE_URL = 'v1/dev/uploadApImages/';
   public static GET_DEV_PROFILE_URL = 'v1/dev/user/';
   public static UPDATE_DEV_PROFILE_URL = 'v1/dev/user/update';
   public static UPLOAD_DEV_AVATAR_URL = 'v1/avatar/upload';
   public static DELETE_DEV_AVATAR_URL = 'v1/avatar/remove';
   public static UPDATE_DEV_PASSWORD = 'v1/common/user/updatePassword';
   public static GET_ACTIVE_CATEGORIES_LIST = 'v1/dev/appCategoryList';
   public static GET_CATEGORY_TYPE_LIST = 'v1/dev/applicationType';
   public static GET_SUB_DEV_LIST = 'v1/dev/all/subuser';
   public static GET_SUB_DEVELOPER = 'v1/dev/subuser';
   public static PUT_SUB_DEVELOPER = 'v1/dev/subuser';
   public static DELETE_APP_IMAGE = 'v1/dev/deleteAppImage';
   public static GET_ALL_USER_REQUESTS = 'v1/dev/getUserAllRequestActDetail';
   public static DOWNLOAD_BVK_KEY_FILE = 'v1/dev/downloadKeyFile';
   public static GET_AUDIT_TRAIL_LIST = 'v1/dev/getAllUserRequest';
   public static APP_SEARCH = 'v1/dev/search/app';
   public static DEV_USER_SEARCH = 'v1/dev/search/devuser';
   public static APP_AUDIT_TRAIL = 'v1/dev/app/auditTrail';

   //PAYPAL PAYMENT GATEWAY
   public static PAYPAL_PAYMENT = 'v1/mobile/pay';
   public static PAYPAL_PAYMENT_SUB_DEV = 'v1/mobile/pay/';
   public static GET_TXN_ID = 'v1/mobile/pay/';

   //ADDON SERVICE URLS
   public static GET_ADDON_SERVICES_LIST = 'v1/common/addon/service/user';
   public static REGISTER_NOTIFICATION_SERVICE = 'v1/common/addon/service/opt';

   //ORGANIZATION URLS
   public static ORG_ADD_USER_REQ = 'v1/dev/add/subuser/';
   public static ORG_USER_REQ_LIST= 'v1/common/subuser/request';

   //HISTORY
   public static GET_USER_TRANSACTIONS= 'v1/dev/getTxn';
   

/** ADMIN API URLs **/
   public static ADMIN_LOGIN ='auth/login';
   public static ADMIN_DASHBOARD ='v1/';
   public static ACC_ACT_REQ ='v1/admin/user/accountRequest';
   public static ACC_ACT_REQ_DASHBOARD ='v1/admin/user/accountRequest?page=1&size=5';
   public static REJECT_AC_ACT ='v1/admin/user/accreq/action/';
   public static GET_CAT_LIST ='v1/';
   public static ALL_DEVELOPER_LIST = 'v1/admin/listofAllUsers';
   public static ACC_REQUEST_DETAILS = 'v1/admin/user/request/';
   public static GET_SINGLE_USER_DETAILS = 'v1/admin/user/';
   public static UPDATE_SINGLE_USER_DETAILS = 'v1/admin/user/acc/update/';
   public static GET_COUNT_DASHBOARD = 'v1/admin/getCount';
   public static GET_APP_REQ_BY_ID = 'v1/dev/applicationByUserId?page=1&size=5';
   public static ALL_APPLICATION_LIST = 'v1/dev/listOfAllApplication?page=1&size=5';
   public static PENDING_APPLICATION_LIST = 'v1/admin/listOfAllAppRequests';
   public static REQUEST_APPLICATION_LIST = 'v1/admin/listOfAllAppRequests';
   public static FIND_APP_BY_ID = 'v1/dev/findAppByAppId/'; 
   public static APPROVE_REJECT_APP_BY_ID = 'v1/dev/updateAppStatus/';
   public static GET_APP_DETAIL = 'v1/dev/appDetail';
   public static UPLOAD_APP_URL = 'v1/dev/uploadApk';
   public static GET_APP_DETAILS_BY_ID = 'v1/admin/appDetail/';
   public static UPDATE_APP_STATUS_BY_ID = 'v1/admin/updateAppStatusRequest/';
   public static UPLOAD_APP_ICON_URL = 'v1/dev/uploadApkIcon/';
   public static APP_LIST_BY_STATUS = 'v1/dev/applicationByStatus';   
   public static GET_APP_DETAIL_BY_REQUEST = 'v1/admin/getAppDetailByRequest/';
   public static FORGET_PASSWORD = 'v1/auth/forgetPassword';
   public static UPDATE_APP_STATUS_ADMIN = 'v1/admin/appStatusAdmin/';
   public static ADMIN_RESET_PASSWORD = 'v1/auth/resetPassword/';
   public static ALL_CATEGORY_LIST = 'v1/dev/appCategoryList';
   public static ADD_APP_CATEGORY = 'v1/dev/saveCategory';
   public static GET_CATEGORY_BY_ID = 'v1/dev/categoryDetail'; 
   public static GET_ADMIN_PROFILE_URL = 'v1/admin/user/';
   public static UPDATE_ADMIN_PROFILE_URL = 'v1/admin/user/update';
   public static UPDATE_PASSWORD = 'v1/common/user/updatePassword';
   public static MOVE_CATEGORY = 'v1/dev/category';
   public static GET_APPLICATION_LIST_BY_CATEGORY_ID = 'v1/dev/applicationByCategory';
   public static VERIFY_MAIL_ID = 'v1/dev/verify/';
   public static GET_APP_TYPE_LIST = 'v1/dev/applicationType';
   public static GET_RATINGS_REVIEW = 'v1/dev/rateReviewList';
   public static Graph = 'v1/dev/appStats';
   public static RELEASE_MGMT = 'v1/dev/release/mgmt';   
   public static APP_ACTIVE_COUNT = 'v1/dev/appActiveStats';   
   public static AVERAGE_RATING_GRAPH = 'v1/dev/appAverageStats';
   public static REPLY_REVIEW = 'v1/dev/reviewOnReply';
   public static DELETE_REVIEW = 'v1/dev/deleteReview';
   public static RESOURCE_REQUESTS = 'v1/common/subuser/request';
   public static RESOURCE_REQUESTS_ACTION = 'v1/admin/subuser/request';
   public static GET_TRANSACTION_DETAIL = 'v1/dev/getAdminTxn/';
   public static REQUESTED_USER_DATA = 'v1/common/acc/';
   public static REQUESTED_APP_DATA = 'v1/common/app/';
   public static APPS_AUDIT_TRAIL = 'v1/dev/app/auditTrail';
   public static ADMIN_APP_SEARCH = 'v1/admin/search/app';
   public static ADMIN_USER_SEARCH = 'v1/admin/search/user';
   public static USER_AUDIT_TRAIL = 'v1/dev/getUserRequestByAdmin/';
}

export class UploadAppdata {
  "app_price": number;
  "applicationId": number;
  "email": "string";
  "fullDescription": "string";
  "language": "string";
  "privacy_policy_url": "string";
  "shortDescription": "string";
  "subscription": 0;
  "versionName": "string";
  "website": "string";
  "whatsNew": "string";
  "appCategory": {
    "appCategoryId": number;
    "categoryType": string;
  };
  "appType": {
    "appTypeId": number;
    "appTypeName": string;
  };

  "appName": string;
  "privacyPolicyUrl":string;
  "packageName":string;
  "title":any;
  "file":any;
  "appCategoryId":number;
  "appTypeId":number;
  "status":any;
  "appIconUrl":string;
  "appBannerUrl":string;
  "appImagesUrls":any = [];
  "updatedAt":string;
  "createdAt":string;

  "listImagesUrls":any = [];
}
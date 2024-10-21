// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: true,

  name: 'admin.test.com.bd',
  domain: 'https://test.com.bd',

  // apiBaseLink: 'https://api.test.com.bd',
  // ftpBaseLink: 'https://api.test.com.bd',

  apiBaseLink: 'http://localhost:3000',
  ftpBaseLink: 'http://localhost:3000',
  ftpPrefix: 'api',

  // videoBaseLink: 'http://localhost:1441/api/bucket/file-stream/',
  videoBaseLink: 'https://test.com/api/bucket/file-stream/',

  appBaseUrl: '/',
  userBaseUrl: '',
  userProfileUrl: '/my-profile',
  userLoginUrl: 'login',
  adminLoginUrl: 'admin/login',
  adminBaseUrl: 'admin',
  accountantBaseUrl: 'admin/account',
  storageSecret: 'test',
  adminTokenSecret: 'test',
  userTokenSecret: 'test',
  apiTokenSecret: 'test',
  VERSION: 1
};


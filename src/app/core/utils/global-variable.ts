import {environment} from '../../../environments/environment';

export const DATABASE_KEY = Object.freeze({
  loginToken: 'test_COURSE_TOKEN_' + environment.VERSION,
  loggInSession: 'test_COURSE_SESSION_' + environment.VERSION,
  loginTokenAdmin: 'test_COURSE_ADMIN_TOKEN_' + environment.VERSION,
  loggInSessionAdmin: 'test_COURSE_ADMIN_SESSION_' + environment.VERSION,
  encryptAdminLogin: 'test_COURSE_USER_0_' + environment.VERSION,
  encryptUserLogin: 'test_COURSE_USER_1_' + environment.VERSION,
  loginAdminRole: 'test_COURSE_ADMIN_ROLE_' + environment.VERSION,
  cartsProduct: 'test_COURSE_USER_CART_' + environment.VERSION,
  productFormData: 'test_COURSE_PRODUCT_FORM_' + environment.VERSION,
  userCart: 'test_COURSE_USER_CART_' + environment.VERSION,
  recommendedProduct: 'test_COURSE_RECOMMENDED_PRODUCT_' + environment.VERSION,
  userCoupon: 'test_COURSE_USER_COUPON_' + environment.VERSION,
  userCookieTerm: 'test_COURSE_COOKIE_TERM' + environment.VERSION,
});

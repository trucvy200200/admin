// ** Auth Endpoints
export default {
  loginEndpoint: "/sign-in",
  forgotPasswordEndpoint: "/auth/admin/forgot-password",
  resetPasswordEndpoint: "/auth/admin/reset-password",
  changePasswordEndpoint: "/admin/change-password",
  registerEndpoint: "/auth/admin/register",
  createKYCEndpoint: "/auth/admin/createkyc",
  updateKYCEndpoint: "/auth/admin/updatekyc",
  logoutEndpoint: "/log-out",

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  firebaseTokenAdmin: "firebaseTokenAdmin",
  storageTokenKeyName: "accessTokenAdmin",
  storageRefreshTokenKeyName: "refreshTokenAdmin",
  storageUserData: "userDataAdmin",
  storageUserRemember: "userRememberAdmin",

  // other item in storage
  storageLanguage: 'language'
}

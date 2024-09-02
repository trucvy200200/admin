export const PERMISSION_SCREEN_ENUM = {
  admin_normal: "admin_normal",
  dashboard: "dashboard",
  customer_approval: "customer_approval",
  customer_relationship_management: "customer_relationship_management",
  customer_contract_management: "customer_contract_management",
  customer_point_management: "customer_point_management",
  transaction_management: "transaction_management",
  deposit_management: "deposit_management",
  withdrawal_management: "withdrawal_management",
  my_ticket_admin: "my_ticket_admin",
  ticket_user_management: "ticket_user_management",
  payment_management: "payment_management",
  startup_management: "startup_management",
  support_configuration: "support_configuration",
  support_history: "support_history",
  bonus_management: "bonus_management",
  bonus_participant_details: "bonus_participant_details",
  devote_configuration: "devote_configuration",
  devote_participant_list: "devote_participant_list",
  devote_participant_details: "devote_participant_details",
  product_configuration: "product_configuration",
  product_registered_users: "product_registered_users",
  event_management: "event_management",
  settings_management: "settings_management",
  bonus_history: "bonus_history",
  startup_history: "startup_history",
  transfer_management: "transfer_management",
  level_management: "level_management",
  admin_action_history: "admin_action_history",
  startup_invest_history: "startup_invest_history",
  product_package_setting: "product_package_setting",
  email_setting: "email_setting",
  email_marketing_management: "email_marketing_management",
  email_marketing_create: "email_marketing_create",
  product_setting: "product_setting",
  face_recognition_countries_setting: "face_recognition_countries_setting",
  reason_setting: "reason_setting",
  terms_setting: "terms_setting",
  user_product_management: "user_product_management",
  product_approval: "product_approval",
  product_management: "product_management",
  enterprise_approval: "enterprise_approval",
  enterprise_management: "enterprise_management",
  industry_setting: "industry_setting",
  ecommerce_setting: "ecommerce_setting",
  order_management: "order_management",
  admin: "admin", // only admin system and it support using
  enterprise_reason_setting: "enterprise_reason_setting",
  enterprise_setting: "enterprise_setting",
  complain_reasons_setting: "complain_reasons_setting",
  categories_setting: "categories_setting",
  customer_management: "customer_management",
  enterprise_deposit_management: "enterprise_deposit_management",
  enterprise_product_review: "enterprise_product_review",

  /* users */
  auto_kyc_users_management: "auto_kyc_users_management",
  warning_wallet_management: "warning_wallet_management",
  withdraw_limit_management: "withdraw_limit_management",

  /* enterprise */
  customer_care_management: "customer_care_management",
  customer_care_contract_management: "customer_care_contract_management",
  enterprise_payment_histories: "enterprise_payment_histories",
  enterprise_transaction_histories: "enterprise_transaction_histories",

  /* deposit and withdraw */
  deposit_withdraw_review: "deposit_withdraw_review",

  /* settings */
  warning_setting: "warning_setting",
  review_ticket_setting: "review_ticket_setting",
  passive_income_setting_management: "passive_income_setting_management",

  error_email_management: "error_email_management"
}

export const PERMISSION_DATA_ALL_ENUM = {
  country_name: "ALL",
  country_code: "0"
}

export const PERMISSION_DATA_ALL = (t) => {
  return {
    country_name: t("ALL"),
    country_code: "0"
  }
}

export const PERMISSION_DATA_ERROR = {
  ALREADY_EXISTS: "Already exists",
  NAME_ALREADY_EXISTS: "The name already exists"
}

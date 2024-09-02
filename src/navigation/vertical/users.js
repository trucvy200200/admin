// ** Icons Import
import { Circle, User } from "react-feather"

export default (props) => {
  return [
    {
      id: "users",
      title: "Users",
      icon: <User size={20} />,
      badge: "light-warning",
      badgeText: `${(props?.totalReviews || 0) + (props?.totalPendingContracts || 0)}`,
      children: [
        {
          id: "review-users",
          title: "User review",
          icon: <Circle size={12} />,
          navLink: "/review-users",
          badge: "light-warning",
          badgeText: `${props?.totalReviews || 0}`,
          action: "view",
          resource: "customer_approval"
        },
        {
          id: "manage-users",
          title: "User management",
          icon: <Circle size={12} />,
          navLink: "/manage-users",
          action: "view",
          resource: "customer_relationship_management"
        },
        {
          id: "auto-kyc-user-management",
          title: "Auto KYC management",
          icon: <Circle size={12} />,
          navLink: "/auto-kyc-users-manage",
          action: "view",
          resource: "auto_kyc_users_management"
        },
        {
          id: "manage-product-users",
          title: "Product users management",
          icon: <Circle size={12} />,
          navLink: "/manage-product-users",
          action: "view",
          resource: "user_product_management"
        },
        {
          id: "user-tree",
          title: "User tree",
          icon: <Circle size={12} />,
          navLink: "/user-tree",
          action: "view",
          resource: "user_tree_management"
        },
        {
          id: "contracts",
          title: "Contract management",
          icon: <Circle size={20} />,
          navLink: "/manage-contract/list",
          badge: "light-warning",
          badgeText: `${props?.totalPendingContracts || 0}`,
          action: "view",
          resource: "customer_contract_management"
        },
        {
          id: "manage-points",
          title: "User point management",
          icon: <Circle size={12} />,
          navLink: "/manage-points",
          action: "view",
          resource: "customer_point_management"
        },
        {
          id: "warning-wallet",
          title: "Warning wallet",
          icon: <Circle size={12} />,
          navLink: "/manage-warning-wallet",
          action: "view",
          resource: "warning_wallet_management"
        },
        {
          id: "withdraw-manage",
          title: "Withdraw limit management",
          icon: <Circle size={12} />,
          navLink: "/manage-withdraw-limit",
          action: "view",
          resource: "withdraw_limit_management"
        }
      ]
    }
  ]
}

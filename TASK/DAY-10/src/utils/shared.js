import { Role } from "./enum";

const messages = {
  USER_DELETE: "are you sure you want to delete the user?",
  UPDATED_SUCCESS: "Record updated successfully",
  UPDATED_FAIL: "Record cannot be updated",
  DELETE_SUCCESS: "Record deleted successfully",
  DELETE_FAIL: "Record cannot be deleted",
  ORDER_SUCCESS: "Your order is successfully placed",
};

const LocalStorageKeys = {
  USER: "user",
};

const NavigationItems = [
  {
    name: "Users",
    route: "/user",
    access: [Role.Admin],
  },
  {
    name: "Categories",
    route: "/categories",
    access: [Role.Admin],
  },
  {
    name: "Book",
    route: "/book",
    access: [Role.Admin, Role.Seller],
  },
  {
    name: "Update Profile",
    route: "/update-profile",
    access: [Role.Admin, Role.Buyer, Role.Seller],
  },
];

const hasAccess = (pathname, user) => {
  const navItem = NavigationItems.find((navItem) =>
    pathname.includes(navItem.route)
  );
  if (navItem) {
    return (
      !navItem.access ||
      !!(navItem.access && navItem.access.includes(user.roleId))
    );
  }
  return true;
};

export default {
  hasAccess,
  NavigationItems,
  LocalStorageKeys,
};

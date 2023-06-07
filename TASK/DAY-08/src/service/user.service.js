import request from "./request";

const ENDPOINT = "api/user";

const getAllRoles = async () => {
  const url = `${ENDPOINT}/roles`;
  return request.get(url).then((res) => {
    return res;
  });
};
const userService = {
  getAllRoles,
};
export default userService;

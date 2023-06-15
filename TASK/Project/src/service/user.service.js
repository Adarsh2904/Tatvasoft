import request from "./request";

const ENDPOINT = "api/user";

const getAllRoles = async () => {
  const url = `${ENDPOINT}/roles`;
  return request.get(url).then((res) => {
    return res;
  });
};

const getAllUsers = async (params) => {
  const url = `${ENDPOINT}`;
  return request.get(url, { params }).then((res) => {
    return res;
  });
};

const getById = async (id) => {
  const url = `${ENDPOINT}/byId?id=${id}`;
  return request.get(url).then((res) => {
    return res;
  });
};

const deleteUser = async (id) => {
  const url = `${ENDPOINT}/?id=${id}`;
  return request.delete(url).then((res) => {
    return res;
  });
};
const update = async (data) => {
  const url = `${ENDPOINT}`;
  return request.put(url, data).then((res) => {
    return res;
  });
};

const updateProfile = async (data) => {
  const url = `${ENDPOINT}`;
  return request.put(url, data).then((res) => {
    return res;
  });
};

const userService = {
  getAllUsers,
  getAllRoles,
  getById,
  deleteUser,
  updateProfile,
  update,
};
export default userService;

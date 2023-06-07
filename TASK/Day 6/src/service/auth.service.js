import request from "./request";

const ENDPOINT = "api/user";

const create = async (values) => {
  const url = `${ENDPOINT}`;
  return request.post(url, values).then((res) => {
    return res;
  });
};

const authService = {
  create,
};
export default authService;

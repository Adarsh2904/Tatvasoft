import request from "./request";

const ENDPOINT = "api/category";

const getAll = async (params) => {
  let url = `${ENDPOINT}/all`;
  if (params) {
    url = `${ENDPOINT}`;
  }
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

const deleteCategory = async (id) => {
  const url = `${ENDPOINT}?id=${id}`;
  return request.delete(url).then((res) => {
    return res;
  });
};

const save = async (data) => {
  if (data.id) {
    const url = `${ENDPOINT}`;
    return request.put(url, data).then((res) => {
      return res;
    });
  } else {
    const url = `${ENDPOINT}`;
    return request.post(url, data).then((res) => {
      return res;
    });
  }
};

const categoryService = { getAll, getById, deleteCategory, save };
export default categoryService;

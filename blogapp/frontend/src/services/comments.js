import axios from "axios";

//kommenttien tallennuspaikka /api/blogs/:id/comments
const baseUrl = "/api/blogs";

const create = async (id, newObject) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, newObject);
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}/comments`);
  return response.data;
};

export default { create, remove };

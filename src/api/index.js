import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:2000/api',
});

export const getTasks = async () => {
  const { data } = await axiosInstance.get('/task');

  return data;
};

export const getTaskById = async (id) => {
  const { data } = await axiosInstance.get(`/task/${id}`);

  return data;
};

export const deleteTask = async (id) => {
  const { data } = await axiosInstance.delete(`/task/${id}`);

  return data;
};

export const editTask = async (id, params = {}) => {
  const { data } = await axiosInstance.patch(`/task/${id}`, params);

  return data;
};

export const createTask = async (params = {}) => {
  const { data } = await axiosInstance.post('/task', params);

  return data;
};

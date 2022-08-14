import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://task-back-diel.herokuapp.com/api',
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

export const editTaskStatus = async (id, params = {}) => {
  const { data } = await axiosInstance.patch(`/task/${id}`, params);

  return data;
};

export const editTask = async (id, params = {}) => {
  const taskData = params;

  taskData.duration = (taskData.hour * 60) + taskData.minute;
  const date = new Date(`${taskData.date}T${taskData.time}:00`);
  taskData.dateTime = date;

  delete taskData.hour;
  delete taskData.minute;
  delete taskData.time;
  delete taskData.date;

  const { data } = await axiosInstance.patch(`/task/${id}`, taskData);

  return data;
};

export const createTask = async (params = {}) => {
  const taskData = params;

  taskData.duration = (taskData.hour * 60) + taskData.minute;
  const date = new Date(`${taskData.date}T${taskData.time}:00`);
  taskData.dateTime = date;

  delete taskData.hour;
  delete taskData.minute;
  delete taskData.time;
  delete taskData.date;

  const { data } = await axiosInstance.post('/task', params);

  return data;
};

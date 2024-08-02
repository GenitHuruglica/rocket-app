import axios from "axios";

const url = "https://api.spacexdata.com/v4/rockets";

export const fetchRockets = async () => {
  const response = await axios.get(url);
  return response.data;
};

export const fetchRocketDetails = async (id: string) => {
  const response = await axios.get(`${url}/${id}`);
  return response.data;
};

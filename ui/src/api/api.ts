import { Repos } from "../types/interfaces/repos";

const baseURL = process.env.REACT_APP_SERVER_HOST

interface ApiResponse {
  data?: Repos[];
  error?: string;
  message?: string;
}

export const getTopFiveContributions = async (repoUrl: string): Promise<ApiResponse> => {
  return await fetch(
    `${baseURL}/api/contributions/topContributions?url=${repoUrl}`,
    {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }
  ).then(response => {
    return response.json();
  })
  .then(data => {
    return data;
  })
  .catch(error => {
    console.error('Fetch error:', error);
    return [];
  });
}
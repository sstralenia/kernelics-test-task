import axios from 'axios';

const GITHUB_BASE_URL = 'https://api.github.com';

const makeRequest = ({ url, token }: { url: string; token: string }) => {
  return axios({
    method: 'get',
    url,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  });
};

// @TODO: Add error handling

export const fetchRepositories = async ({ token }: { token: string }) => {
  const response = await makeRequest({ url: `${GITHUB_BASE_URL}/user/repos`, token });

  return response.data;
}

export const getRepository = async ({ token, name, owner }: { token: string; name: string; owner: string }) => {
  const response = await makeRequest({ url: `${GITHUB_BASE_URL}/repos/${owner}/${name}`, token });

  return response.data;
}

export const getRepositoryContent = async ({ token, name, owner, path }: { token: string; name: string; owner: string; path: string; }) => {
  const response = await makeRequest({url: `${GITHUB_BASE_URL}/repos/${owner}/${name}/contents/${path}`, token });

  return response.data;
}

export const getRepositoryWebhooks = async ({ token, name, owner }: { token: string; name: string; owner: string }) => {
  const response = await makeRequest({ url: `${GITHUB_BASE_URL}/repos/${owner}/${name}/hooks`, token });

  return response.data;
}
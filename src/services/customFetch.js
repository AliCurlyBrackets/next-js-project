import EndPoint from './EndPoint';

const baseURL = EndPoint.EndPoint;

const customFetch = async (url, options = {}) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
    "Expires": "0",
  };

  const headers = { ...defaultHeaders, ...options.headers };

  const fetchOptions = {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: options.credentials || 'same-origin',
    cache: 'no-store',
  };

  try {
    const response = await fetch(`${baseURL}${url}`, fetchOptions);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) { throw error; }
};

export default customFetch;
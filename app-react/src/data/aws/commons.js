export const baseURL = process.env.REACT_APP_BASE_URL;
export const bucketName = process.env.REACT_APP_BUCKET_NAME;

export const sanitizeURL = url => btoa(encodeURI(url));
export const deSanitizeURL = url => decodeURI(atob(url));

const BASE_URL = import.meta.env.DEV ? 'http://localhost:5001/api' : '/api';

export const GOOGLE_AUTH_URL = `${BASE_URL}/auth/google`;
let isAuthenticated = false;

export const auth = {
  login: (username: string, password: string) => {
    // Fake user check
    if (username === 'admin' && password === '123qweAdmin@') {
      isAuthenticated = true;
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  },

  logout: () => {
    isAuthenticated = false;
  },

  check: () => isAuthenticated,
};

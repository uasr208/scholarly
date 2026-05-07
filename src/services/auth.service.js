// Authentication service mock used by the login page.
// Persists a simple user object to local storage for demo flows.

export const authService = {
  login: async (email, password, role) => {
    // Simulate network latency so loading states behave correctly.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple validation branch used only for local development.
        // Replace with a real backend authentication call later.
        if (email.includes("error")) {
          reject("Invalid academic email format.");
        } else {
          // Build the mocked authenticated user payload.
          const mockUser = {
            email: email,
            role: role, // 'teacher' or 'principal'
            token: "mock-jwt-token-12345",
          };

          // Persist user details locally to keep the session across refreshes.
          localStorage.setItem("scholarly_user", JSON.stringify(mockUser));

          resolve(mockUser);
        }
      }, 1500);
    });
  },

  logout: () => {
    localStorage.removeItem("scholarly_user");
  },
};

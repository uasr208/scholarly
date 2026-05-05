// src/services/auth.service.js

export const authService = {
  login: async (email, password, role) => {
    // We wrap this in a Promise to simulate a network delay (1.5 seconds)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock logic: In a real app, this would be an API call to a database
        if (email.includes("error")) {
          reject("Invalid academic email format.");
        } else {
          // Create a mock user object based on the role selected in the UI
          const mockUser = {
            email: email,
            role: role, // 'teacher' or 'principal'
            token: "mock-jwt-token-12345",
          };

          // Save to localStorage so the user stays logged in on refresh
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

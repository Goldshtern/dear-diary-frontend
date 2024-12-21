// Fake data to simulate user sign up and sign in
const fakeUser = {
  id: "fake-user-id",
  name: "Fake User",
  email: "fakeuser@example.com",
  avatarUrl: "https://example.com/avatar.jpg",
};

// Fake token for simulation
const fakeToken = "a_fake_token";

// Simulate signUp (fake response)
export function signUp({ name, avatarUrl, email, password }) {
  return new Promise((resolve, reject) => {
    // Simulate user sign up logic
    setTimeout(() => {
      if (email === fakeUser.email) {
        // Simulate that user already exists
        reject("User with this email already exists");
      } else {
        // Simulate successful sign up
        resolve({
          user: {
            id: Math.random().toString(36).substring(7), // Random ID generation
            name,
            avatarUrl,
            email,
          },
          token: fakeToken, // Returning a fake token
        });
      }
    }, 500); // Simulate delay
  });
}

// Simulate signIn (fake response)
export function signIn({ email, password }) {
  return new Promise((resolve, reject) => {
    // Simulate user sign in logic
    setTimeout(() => {
      if (email === fakeUser.email && password === "correctpassword") {
        // Simulate successful sign in
        resolve({
          user: fakeUser,
          token: fakeToken, // Returning a fake token
        });
      } else {
        // Simulate wrong credentials
        reject("Invalid email or password");
      }
    }, 500); // Simulate delay
  });
}

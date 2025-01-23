const fakeUser = {
  id: "fake-user-id",
  name: "Fake User",
  email: "fakeuser@example.com",
  avatarUrl: "https://example.com/avatar.jpg",
  password: "fake1234",
};

const fakeToken = "a_fake_token";

export function signUp({ name, avatarUrl, email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!password || password.length < 6) {
        reject("Password must be at least 6 characters long");
        return;
      }
      if (email === fakeUser.email) {
        reject("User with this email already exists");
      } else {
        resolve({
          user: {
            id: Math.random().toString(36).substring(7),
            name,
            avatarUrl,
            email,
          },
          token: fakeToken,
        });
      }
    }, 500);
  });
}

export function signIn({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === fakeUser.email && password === "correctpassword") {
        resolve({
          user: fakeUser,
          token: fakeToken,
        });
      } else {
        reject("Invalid email or password");
      }
    }, 500);
  });
}

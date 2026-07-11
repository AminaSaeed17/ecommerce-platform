// @ts-ignore
export function mockLogin(values) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          message: "Login successfully",
          token: "fake_token_123",
          user: {
            email: values.email,
          },
        },
      });
    }, 1000);
  });
}
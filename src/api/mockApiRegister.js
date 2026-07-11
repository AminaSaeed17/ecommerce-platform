// @ts-ignore
export function mockRegister(values) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          message: "User created successfully",
          token: "fake_token_123456",
          user: {
            name: values.name,
            email: values.email,
            phone: values.phone,
          },
        },
      });
    }, 1000);
  });
}
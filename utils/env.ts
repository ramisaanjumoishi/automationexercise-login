import 'dotenv/config';

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env variable "${name}". Copy .env.example to .env and fill it in.`);
  }
  return value;
}

export const credentials = {
  email: required('USER_EMAIL'),
  password: required('USER_PASSWORD'),
  name: required('USER_NAME'),
};

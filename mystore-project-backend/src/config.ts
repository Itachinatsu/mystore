import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  host: process.env.AWS_RDS_HOSTNAME,
  port: Number(process.env.AWS_RDS_PORT),

  database: process.env.ENV === 'dev' ? process.env.AWS_RDS_DB_NAME : process.env.AWS_RDS_TEST_DB,
  username: process.env.ENV === 'dev' ? `${process.env.AWS_RDS_USERNAME}` : `${process.env.AWS_RDS_TEST_USER}`,
  password: process.env.ENV === 'dev' ? `${process.env.AWS_RDS_PASSWORD}` : `${process.env.AWS_RDS_TEST_PASSWORD}`,

  dialect: "postgres",
  env: process.env.ENV,

  bcrypt_password: process.env.BCRYPT_PASSWORD,
  salt_rounds: process.env.SALT_ROUNDS,
  token_secret: process.env.TOKEN_SECRET,
  jwt: {
    secret: process.env.TOKEN_SECRET,
  },
}
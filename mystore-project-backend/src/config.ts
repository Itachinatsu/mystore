import * as dotenv from "dotenv";
dotenv.config();

function getDbHost(): string {
  // determine database host based on environment
  if (process.env.ENV === 'staging') { 
    return process.env.AWS_RDS_HOSTNAME_STAGING as string
  } else if (process.env.ENV === 'prod') {
    return process.env.AWS_RDS_HOSTNAME_PROD as string
  } else {
    // for dev or test
    return process.env.AWS_RDS_HOSTNAME as string
  }
}

function getDbName(): string {
  // determine database host based on environment
  if (process.env.ENV === 'test') { 
    return process.env.AWS_RDS_TEST_DB as string
  } else {
    return process.env.AWS_RDS_DB_NAME as string
  }
}

function getDbUserName(): string {
  // determine database host based on environment
  if (process.env.ENV === 'test') { 
    return process.env.AWS_RDS_TEST_USER as string
  } else {
    return process.env.AWS_RDS_USERNAME as string
  }
}

function getDbPassword(): string {
  // determine database host based on environment
  if (process.env.ENV === 'test') { 
    return process.env.AWS_RDS_TEST_PASSWORD as string
  } else {
    return process.env.AWS_RDS_PASSWORD as string
  }
}

export const config = {
  dbhost: getDbHost(),
  dbport: Number(process.env.AWS_RDS_PORT),

  database: getDbName(),
  username: getDbUserName(),
  password: getDbPassword(),

  dialect: "postgres",
  env: process.env.ENV,
  app_port: Number(process.env.PORT),

  bcrypt_password: process.env.BCRYPT_PASSWORD,
  salt_rounds: process.env.SALT_ROUNDS,
  token_secret: process.env.TOKEN_SECRET,
  jwt: {
    secret: process.env.TOKEN_SECRET,
  },
}
eb use Mystorebackend-env-2

eb setenv AWS_RDS_HOSTNAME=$AWS_RDS_HOSTNAME AWS_RDS_PORT=$AWS_RDS_PORT AWS_RDS_DB_NAME=$AWS_RDS_DB_NAME AWS_RDS_USERNAME=$AWS_RDS_USERNAME AWS_RDS_PASSWORD=$AWS_RDS_PASSWORD PORT=$PORT ENV=$ENV BCRYPT_PASSWORD=$BCRYPT_PASSWORD SALT_ROUNDS=$SALT_ROUNDS TOKEN_SECRET=$TOKEN_SECRET

eb deploy Mystorebackend-env-2
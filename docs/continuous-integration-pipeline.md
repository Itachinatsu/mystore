# CircleCI Continuous Integration Pipeline

When code is pushed to the main branch of the repository, CircleCI performs an automated build via a continuous integration pipeline:

1.  Sets up the build environment
2.  Installs the necessary tools to build, test and deploy
3.  Checks out the code from the main branch of the repository
4.  Installs the code dependencies for both the backend and front-end applications
5.  Builds both backend and front-end applications
6.  Runs the tests for both backend and front-end applications
7.  Deploys the backend API application to the AWS Elastic Beanstalk (EB) environment
8.  Deploys the front-end UI application to the AWS Simple Storage Service (S3) bucket

# mystore-fullstack

[![CircleCI](https://circleci.com/gh/markdeleon01/mystore-fullstack/tree/main.svg?style=shield)](https://circleci.com/gh/markdeleon01/mystore-fullstack/tree/main)

MyStore is a full stack web application hosted on Amazon Web Services and is the final project under Udacity's Full Stack JavaScript Developer Nanodegree Program.

---

UI:  http://mystorefrontend-bucket.s3-website-us-east-1.amazonaws.com

API: http://mystorebackend-env.eba-jydy275n.us-east-1.elasticbeanstalk.com


---


## Amazon Web Services

### AWS Simple Storage Service (S3)

![alt text](https://github.com/markdeleon01/mystore-fullstack/blob/main/screenshots/S3bucket.png "AWS S3")

### AWS Elastic Beanstalk (EB)

![alt text](https://github.com/markdeleon01/mystore-fullstack/blob/main/screenshots/EBenv.png "AWS EB")


### AWS Relational Database Service (RDS)

![alt text](https://github.com/markdeleon01/mystore-fullstack/blob/main/screenshots/RDSdb.png "AWS RDS")

---

## CircleCI

This full stack web application is deployed with a CircleCI continuous integration pipeline.


**Pipeline Highlights**:
1. Able to run the unit, integration and end-to-end tests for both backend and front-end applications
2. Able to do Pull Request builds against the *staging* and *main* branches
3. Able to deploy PR code to the Staging environment and main branch code to the Production environment


![alt text](https://github.com/markdeleon01/mystore-fullstack/blob/main/screenshots/circleci-build-test-deploy.png "CircleCI")


All the secrets found in the application are configured inside CircleCi and passed to the production application.

![alt text](https://github.com/markdeleon01/mystore-fullstack/blob/main/screenshots/circleci-secrets.png "CircleCI secrets configuration")


---

## Documentation

Documentation about the architecture, infrastructure description, app dependencies, and the pipeline process are found inside the [docs](https://github.com/markdeleon01/mystore-fullstack/tree/main/docs) folder.
